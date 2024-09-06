import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react"
import { useRouter } from "next/router"
import {
  COREKIT_STATUS,
  generateFactorKey,
  JWTLoginParams,
  makeEthereumSigner,
  parseToken,
  TssShareType,
  UserInfo,
  Web3AuthMPCCoreKit,
} from "@web3auth/mpc-core-kit"

import { BrowserProvider, JsonRpcSigner } from "ethers"

import { verifier } from "@/lib/constants"
import { signInWithGoogle } from "@/lib/firebase"
import { evmProvider, web3AuthConfig } from "@/lib/web3auth"
import { EthereumSigningProvider } from "@web3auth/ethereum-mpc-provider"
import { BN } from "bn.js"

let coreKitInstance: Web3AuthMPCCoreKit

if (typeof window !== "undefined") {
  coreKitInstance = new Web3AuthMPCCoreKit({
    ...web3AuthConfig,
    storage: window.localStorage,
  })

  evmProvider.setupProvider(makeEthereumSigner(coreKitInstance))
}

type AppProviderProps = {
  children: ReactNode
}

type AppContextType = {
  login: () => Promise<void>
  logout: () => Promise<void>
  user: UserInfo | undefined
  isLoggedIn: boolean
  coreKitInstance: Web3AuthMPCCoreKit
  coreKitStatus: COREKIT_STATUS
  evmProvider: EthereumSigningProvider
  signer: JsonRpcSigner | undefined
  accessWithFactorKey: (userFactorKey: string) => Promise<void>
  isFKRequired: boolean
  isMFAEnabled: () => Promise<boolean>
  enableMFA: () => Promise<string | undefined>
}

export const AppContext = createContext<AppContextType | null>(null)

const AppProvider = ({ children }: AppProviderProps) => {
  const router = useRouter()

  const [user, setUser] = useState<UserInfo | undefined>()
  const [coreKitStatus, setCoreKitStatus] = useState<COREKIT_STATUS>(
    COREKIT_STATUS.NOT_INITIALIZED,
  )
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>()
  const [isFKRequired, setIsFKRequired] = useState(false)

  useEffect(() => {
    const init = async () => {
      await coreKitInstance.init()
      setCoreKitStatus(coreKitInstance.status)
      await settingSigner()
    }
    init()
  }, [])

  useEffect(() => {
    const init = async () => {
      if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
        setIsLoggedIn(true)
        await getUserInfo()
        await settingSigner()
      } else setIsLoggedIn(false)
    }
    init()
  }, [coreKitInstance?.status])

  const getUserInfo = async () => {
    if (!coreKitInstance) {
      throw new Error("initiated to login")
    }

    const userInfo = coreKitInstance.getUserInfo()
    setUser(userInfo)
  }

  const login = async () => {
    try {
      if (!coreKitInstance) {
        throw new Error("initiated to login")
      }
      const loginRes = await signInWithGoogle()
      const idToken = await loginRes.user.getIdToken(true)
      const parsedToken = parseToken(idToken)

      const idTokenLoginParams = {
        verifier,
        verifierId: parsedToken.sub,
        idToken,
      } as JWTLoginParams

      await coreKitInstance.loginWithJWT(idTokenLoginParams)
      if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
        setIsLoggedIn(true)
        await coreKitInstance.commitChanges()
      }

      if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
        setIsFKRequired(true)
        console.log(
          "required more shares, please enter your backup/ device factor key, or reset account [unrecoverable once reset, please use it with caution]",
        )
      }

      setCoreKitStatus(coreKitInstance.status)
    } catch (err) {
      console.log(err)
    }
  }

  const logout = async () => {
    await coreKitInstance.logout()
    setCoreKitStatus(coreKitInstance.status)

    setSigner(undefined)
    setIsLoggedIn(false)
    setIsFKRequired(false)
    setUser(undefined)

    router.push("/")
  }

  const settingSigner = async (): Promise<JsonRpcSigner | undefined> => {
    if (!evmProvider || signer) return

    const ethersProvider = new BrowserProvider(evmProvider)

    try {
      const tmp = await ethersProvider.getSigner()
      setSigner(tmp)
    } catch (error) {
      console.log("en el settingSigner", error)
      // router.push("/")
    }
  }

  const accessWithFactorKey = async (userFactoryKey: string) => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance not found")
    }

    const factorKey = new BN(userFactoryKey, "hex")
    // "1851101c9dece4048d34e3954052f6cfc6bbc738e17ec86420abb1b43f1d04f8",
    // const xx = coreKitInstance?.getCurrentFactorKey()
    // console.log("xx.factorKey :>> ", xx.factorKey)
    await coreKitInstance.inputFactorKey(factorKey)

    setCoreKitStatus(coreKitInstance.status)

    if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
      // uiConsole(
      //   "required more shares even after inputing backup factor key, please enter your backup/ device factor key, or reset account [unrecoverable once reset, please use it with caution]",
      // )
    }
  }

  const isMFAEnabled = async (): Promise<boolean> => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set")
    }

    const actualFK = await coreKitInstance.getDeviceFactor()

    return actualFK != undefined && actualFK !== ""
  }

  const getSocialMFAFactorKey = async (): Promise<string> => {
    try {
      if (!coreKitInstance) {
        throw new Error("coreKitInstance is not set")
      }
      const factorKey = generateFactorKey()

      const socialFactorKey = await coreKitInstance.createFactor({
        shareType: TssShareType.RECOVERY,
        factorKey: factorKey.private,
      })

      return socialFactorKey
    } catch (err) {
      return ""
    }
  }

  const enableMFA = async (): Promise<string | undefined> => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set")
    }
    let pubFacK = ""

    try {
      const isEnabled = await isMFAEnabled()

      if (isEnabled) return

      pubFacK = await getSocialMFAFactorKey()
      const factorKey = new BN(pubFacK, "hex")
      await coreKitInstance.enableMFA({ factorKey })

      if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
        await coreKitInstance.commitChanges()
      }
    } catch (e) {}

    return pubFacK
  }

  return (
    <AppContext.Provider
      value={{
        login,
        logout,
        user,
        isLoggedIn,
        coreKitInstance,
        coreKitStatus,
        evmProvider,
        signer,
        accessWithFactorKey,
        isFKRequired,
        isMFAEnabled,
        enableMFA,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
export const useAppContext = () => useContext(AppContext) as AppContextType
