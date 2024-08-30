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
  JWTLoginParams,
  makeEthereumSigner,
  parseToken,
  UserInfo,
  Web3AuthMPCCoreKit,
} from "@web3auth/mpc-core-kit"

import { verifier } from "@/lib/constants"
import { signInWithGoogle } from "@/lib/firebase"
import { evmProvider, web3AuthConfig } from "@/lib/web3auth"

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
}

export const AppContext = createContext<AppContextType | null>(null)

const AppProvider = ({ children }: AppProviderProps) => {
  const router = useRouter()

  const [user, setUser] = useState<UserInfo | undefined>()
  const [coreKitStatus, setCoreKitStatus] = useState<COREKIT_STATUS>(
    COREKIT_STATUS.NOT_INITIALIZED,
  )
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const init = async () => {
      await coreKitInstance.init()
      setCoreKitStatus(coreKitInstance.status)
    }
    init()
  }, [])

  useEffect(() => {
    const init = async () => {
      if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN)
        await getUserInfo()
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

    router.push("/")
  }

  return (
    <AppContext.Provider
      value={{
        login,
        logout,
        user,
        isLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
export const useAppContext = () => useContext(AppContext) as AppContextType
