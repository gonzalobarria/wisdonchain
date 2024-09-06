"use client"
import { tssLib } from "@toruslabs/tss-dkls-lib"

import { CHAIN_NAMESPACES, IProvider } from "@web3auth/base"
import { CommonPrivateKeyProvider } from "@web3auth/base-provider"
import { EthereumSigningProvider } from "@web3auth/ethereum-mpc-provider"
// IMP START - Quick Start
import {
  COREKIT_STATUS,
  FactorKeyTypeShareDescription,
  generateFactorKey,
  JWTLoginParams,
  keyToMnemonic,
  makeEthereumSigner,
  mnemonicToKey,
  parseToken,
  TssShareType,
  WEB3AUTH_NETWORK,
  Web3AuthMPCCoreKit,
} from "@web3auth/mpc-core-kit"
// Optional, only for social second factor recovery
import Web3AuthSingleFactorAuth from "@web3auth/single-factor-auth"
import { BN } from "bn.js"
// Firebase libraries for custom authentication
import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth"
import { useEffect, useState } from "react"
// IMP END - Quick Start
// import { core, Web3 } from "web3";
import dynamic from "next/dynamic"
import { ethers, JsonRpcSigner, Wallet } from "ethers"

const FloatingInbox = dynamic(() => import("../components/web/FloatingInbox-hooks"), {
  ssr: false,
})

// IMP START - SDK Initialization
// IMP START - Dashboard Registration
const web3AuthClientId = process.env.NEXT_PUBLIC_CLIENT_ID ?? ""
// const web3AuthClientId =
//   "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ" // get from https://dashboard.web3auth.io
// IMP END - Dashboard Registration

// IMP START - Verifier Creation
const verifier = process.env.NEXT_PUBLIC_VERIFIER ?? ""
// IMP END - Verifier Creation

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorer: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
}

let coreKitInstance: Web3AuthMPCCoreKit
let evmProvider: EthereumSigningProvider

if (typeof window !== "undefined") {
  coreKitInstance = new Web3AuthMPCCoreKit({
    web3AuthClientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.DEVNET,
    storage: window.localStorage,
    manualSync: true, // This is the recommended approach
    tssLib: tssLib,
  })

  // Setup provider for EVM Chain
  evmProvider = new EthereumSigningProvider({ config: { chainConfig } })
  evmProvider.setupProvider(makeEthereumSigner(coreKitInstance))
}
// IMP END - SDK Initialization

// IMP START - Auth Provider Login
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}
// IMP END - Auth Provider Login

function App() {
  const [coreKitStatus, setCoreKitStatus] = useState<COREKIT_STATUS>(
    COREKIT_STATUS.NOT_INITIALIZED,
  )
  const [backupFactorKey, setBackupFactorKey] = useState<string>("")
  const [mnemonicFactor, setMnemonicFactor] = useState<string>("")
  const [wallet, setWallet] = useState<ethers.JsonRpcSigner | null>(null)

  // Firebase Initialisation
  const app = initializeApp(firebaseConfig)

  useEffect(() => {
    const init = async () => {
      // IMP START - SDK Initialization
      await coreKitInstance.init()
      // IMP END - SDK Initialization

      setCoreKitStatus(coreKitInstance.status)
    }
    init()
  }, [])

  useEffect(() => {
    const getDetails = async () => {
      if (coreKitInstance?.status === COREKIT_STATUS.LOGGED_IN) {
        const wallet = await getWallet()
        setWallet(wallet)
      }
    }
    getDetails()
  }, [coreKitInstance?.status])

  // IMP START - Auth Provider Login
  const signInWithGoogle = async (): Promise<UserCredential> => {
    try {
      const auth = getAuth(app)
      const googleProvider = new GoogleAuthProvider()
      const res = await signInWithPopup(auth, googleProvider)
      return res
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  // IMP END - Auth Provider Login

  const getWallet = async (): Promise<JsonRpcSigner | null> => {
    if (!evmProvider) {
      uiConsole("provider not initialized yet")
      return null
    }
    const ethersProvider = new ethers.BrowserProvider(evmProvider)

    return ethersProvider.getSigner()
  }

  const login = async () => {
    try {
      if (!coreKitInstance) {
        throw new Error("initiated to login")
      }
      // IMP START - Auth Provider Login
      const loginRes = await signInWithGoogle()
      const idToken = await loginRes.user.getIdToken(true)
      const parsedToken = parseToken(idToken)
      // IMP END - Auth Provider Login

      // IMP START - Login
      const idTokenLoginParams = {
        verifier,
        verifierId: parsedToken.sub,
        idToken,
      } as JWTLoginParams

      await coreKitInstance.loginWithJWT(idTokenLoginParams)
      if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
        await coreKitInstance.commitChanges() // Needed for new accounts
      }
      // IMP END - Login

      // IMP START - Recover MFA Enabled Account
      if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
        uiConsole(
          "required more shares, please enter your backup/ device factor key, or reset account [unrecoverable once reset, please use it with caution]",
        )
      }
      // IMP END - Recover MFA Enabled Account

      setCoreKitStatus(coreKitInstance.status)
    } catch (err) {
      uiConsole(err)
    }
  }
  // IMP START - Recover MFA Enabled Account
  const inputBackupFactorKey = async () => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance not found")
    }
    // if (!backupFactorKey) {
    //   throw new Error("backupFactorKey not found")
    // }

    const factorKey = new BN(
      "1851101c9dece4048d34e3954052f6cfc6bbc738e17ec86420abb1b43f1d04f8",
      "hex",
    )
    // const xx = coreKitInstance?.getCurrentFactorKey()
    // console.log("xx.factorKey :>> ", xx.factorKey)
    await coreKitInstance.inputFactorKey(factorKey)

    setCoreKitStatus(coreKitInstance.status)

    if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
      uiConsole(
        "required more shares even after inputing backup factor key, please enter your backup/ device factor key, or reset account [unrecoverable once reset, please use it with caution]",
      )
    }
  }
  // IMP END - Recover MFA Enabled Account

  // IMP START - Export Social Account Factor
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

      setBackupFactorKey(socialFactorKey as string)
      return socialFactorKey as string
    } catch (err) {
      uiConsole(err)
      return ""
    }
  }
  // IMP END - Export Social Account Factor

  const isMFAEnabled = async () => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set")
    }

    const actualFK = await coreKitInstance.getDeviceFactor()

    return actualFK != undefined && actualFK !== ""
  }

  // IMP START - Enable Multi Factor Authentication
  const enableMFA = async () => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set")
    }
    try {
      const isEnabled = await isMFAEnabled()

      if (isEnabled) return

      const factorKey = new BN(await getSocialMFAFactorKey(), "hex")
      await coreKitInstance.enableMFA({ factorKey })

      if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
        await coreKitInstance.commitChanges()
      }

      uiConsole(
        "MFA enabled, device factor stored in local store, deleted hashed cloud key, your backup factor key is associated with the firebase email password account in the app",
      )
    } catch (e) {
      uiConsole(e)
    }
  }
  // IMP END - Enable Multi Factor Authentication

  const keyDetails = async () => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance not found")
    }
    uiConsole(coreKitInstance.getKeyDetails())
  }

  const getDeviceFactor = async () => {
    try {
      const factorKey = await coreKitInstance.getDeviceFactor()
      setBackupFactorKey(factorKey as string)
      uiConsole("Device share: ", factorKey)
    } catch (e) {
      uiConsole(e)
    }
  }

  const exportMnemonicFactor = async (): Promise<void> => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set")
    }
    uiConsole("export share type: ", TssShareType.RECOVERY)
    const factorKey = generateFactorKey()
    await coreKitInstance.createFactor({
      shareType: TssShareType.RECOVERY,
      factorKey: factorKey.private,
    })
    const factorKeyMnemonic = await keyToMnemonic(
      factorKey.private.toString("hex"),
    )
    if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
      await coreKitInstance.commitChanges()
    }
    uiConsole("Export factor key mnemonic: ", factorKeyMnemonic)
  }

  const MnemonicToFactorKeyHex = async (mnemonic: string) => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set")
    }
    try {
      const factorKey = await mnemonicToKey(mnemonic)
      setBackupFactorKey(factorKey)
      return factorKey
    } catch (error) {
      uiConsole(error)
    }
  }

  const getUserInfo = async () => {
    // IMP START - Get User Information
    const user = coreKitInstance.getUserInfo()
    // IMP END - Get User Information
    uiConsole(user)
  }

  const logout = async () => {
    // IMP START - Logout
    await coreKitInstance.logout()
    // IMP END - Logout
    setCoreKitStatus(coreKitInstance.status)
    uiConsole("logged out")
  }

  // IMP START - Blockchain Calls
  const getAccounts = async () => {
    if (!coreKitInstance) {
      uiConsole("provider not initialized yet")
      return
    }
    const ethersProvider = new ethers.BrowserProvider(evmProvider)
    const signer = await ethersProvider.getSigner()
    const address = signer.getAddress()
    uiConsole(address)

    return address || ""
  }

  const getBalance = async () => {
    if (!coreKitInstance) {
      uiConsole("provider not initialized yet")
      return
    }
    const ethersProvider = new ethers.BrowserProvider(evmProvider)
    const signer = await ethersProvider.getSigner()
    const address = signer.getAddress()

    const balance = ethers.formatEther(
      await ethersProvider.getBalance(address), // Balance is in wei
    )
    uiConsole(balance)
  }

  const signMessage = async () => {
    if (!coreKitInstance) {
      uiConsole("provider not initialized yet")
      return
    }
    uiConsole("Signing Message...")

    const ethersProvider = new ethers.BrowserProvider(evmProvider)
    const signer = await ethersProvider.getSigner()

    const originalMessage = "YOUR_MESSAGE"

    // Sign the message
    const signedMessage = await signer.signMessage(originalMessage)

    uiConsole(signedMessage)
  }
  // IMP END - Blockchain Calls

  const criticalResetAccount = async (): Promise<void> => {
    // This is a critical function that should only be used for testing purposes
    // Resetting your account means clearing all the metadata associated with it from the metadata server
    // The key details will be deleted from our server and you will not be able to recover your account
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set")
    }
    // if (selectedNetwork === WEB3AUTH_NETWORK.MAINNET) {
    //   throw new Error("reset account is not recommended on mainnet");
    // }
    await coreKitInstance.tKey.storageLayer.setMetadata({
      privKey: new BN(coreKitInstance.state.postBoxKey! as string, "hex"),
      input: { message: "KEY_NOT_FOUND" },
    })
    if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
      await coreKitInstance.commitChanges()
    }
    uiConsole("reset")
    logout()
  }

  function uiConsole(...args: any): void {
    const el = document.querySelector("#console>p")
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2)
    }
    console.log(...args)
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={keyDetails} className="card">
            Key Details
          </button>
        </div>
        <div>
          <button onClick={enableMFA} className="card">
            Enable MFA
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
        <div>
          <button onClick={criticalResetAccount} className="card">
            [CRITICAL] Reset Account
          </button>
        </div>
        <div>
          <button onClick={exportMnemonicFactor} className="card">
            Generate Backup (Mnemonic)
          </button>
        </div>
        <FloatingInbox wallet={wallet} onLogout={logout} />
      </div>
    </>
  )

  const unloggedInView = (
    <>
      <button onClick={login} className="card">
        Login
      </button>
      <div
        className={
          coreKitStatus === COREKIT_STATUS.REQUIRED_SHARE ? "" : "disabledDiv"
        }
      >
        <button onClick={() => getDeviceFactor()} className="card">
          Get Device Factor
        </button>
        <label>Recover Using Mnemonic Factor Key:</label>
        <input
          value={mnemonicFactor}
          onChange={(e) => setMnemonicFactor(e.target.value)}
        ></input>
        <button
          onClick={() => MnemonicToFactorKeyHex(mnemonicFactor)}
          className="card"
        >
          Get Recovery Factor Key using Mnemonic
        </button>
        <button onClick={() => getSocialMFAFactorKey()} className="card">
          Get Social MFA Factor
        </button>
        <label>Backup/ Device Factor: {backupFactorKey}</label>
        <button onClick={() => inputBackupFactorKey()} className="card">
          Input Backup Factor Key
        </button>
        <button onClick={criticalResetAccount} className="card">
          [CRITICAL] Reset Account
        </button>
      </div>
    </>
  )

  return (
    <div className="container">
      <h1 className="title">
        <a
          target="_blank"
          href="https://web3auth.io/docs/sdk/core-kit/mpc-core-kit/"
          rel="noreferrer"
        >
          Web3Auth MPC Core Kit
        </a>{" "}
        Nextjs Quick Start
      </h1>

      <div className="grid">
        {coreKitStatus === COREKIT_STATUS.LOGGED_IN
          ? loggedInView
          : unloggedInView}
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>

      <footer className="footer">
        <a
          href="https://github.com/Web3Auth/web3auth-core-kit-examples/tree/main/mpc-core-kit-web/quick-starts/mpc-core-kit-react-quick-start"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </div>
  )
}

export default App
