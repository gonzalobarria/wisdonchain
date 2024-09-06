import {
  CHAIN_NAMESPACES,
  IProvider,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from "@web3auth/base"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { Web3AuthNoModal } from "@web3auth/no-modal"
import { OpenloginAdapter } from "@web3auth/openlogin-adapter"
import { useEffect, useState } from "react"
import { ethers, JsonRpcSigner } from "ethers"
import dynamic from "next/dynamic"
import Wisd from "@/components/abis/WisdOnChain.json"
import { CONTRACT_ADDRESSES } from "@/lib/constants"
import { morphHolesky } from "wagmi/chains"

const FloatingInbox = dynamic(() => import("@/components/web/FloatingInbox-hooks"), {
  ssr: false,
})

// const clientId = process.env.NEXT_PUBLIC_CLIENT_ID ?? ''
const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xafa",
  rpcTarget: "https://rpc-holesky.morphl2.io",
  displayName: "Morph Holesky",
  blockExplorerUrl: "https://explorer-holesky.morphl2.io/",
  ticker: "ETH",
  tickerName: "ETH",
  logo: "https://morphl2brand.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ffcab2c10-8da9-4414-aa63-4998ddf62e78%2F64fbcffc-0e7c-45e1-8900-1bb36dc90924%2FFrame_1597882262.png?table=block&id=0e6a22c3-ed4e-4c25-9575-11b95b1eade9&spaceId=fcab2c10-8da9-4414-aa63-4998ddf62e78&width=2000&userId=&cache=v2",
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
})

const web3auth = new Web3AuthNoModal({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
})

const openloginAdapter = new OpenloginAdapter()
web3auth.configureAdapter(openloginAdapter)

function App() {
  const [provider, setProvider] = useState<IProvider | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [wallet, setWallet] = useState<any | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.init()
        setProvider(web3auth.provider)

        if (web3auth.connected) {
          setLoggedIn(true)
        }
      } catch (error) {
        console.error(error)
      }
    }

    init()
  }, [])

  useEffect(() => {
    const getDetails = async () => {
      if (web3auth.connected) {
        const address = await getAccounts()
        setAddress(address)
        const wallet = await getWallet()
        setWallet(wallet)
      }
    }
    getDetails()
  }, [provider, loggedIn])

  const login = async () => {
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      },
    )
    setProvider(web3authProvider)
    if (web3auth.connected) {
      setLoggedIn(true)
    }
  }

  const getWallet = async (): Promise<JsonRpcSigner | null> => {
    if (!provider) {
      uiConsole("provider not initialized yet")
      return null
    }
    const ethersProvider = new ethers.BrowserProvider(provider)

    return ethersProvider.getSigner()
  }

  const getAccounts = async (): Promise<any> => {
    if (!provider) {
      uiConsole("provider not initialized yet")
      return
    }
    try {
      const ethersProvider = new ethers.BrowserProvider(provider)
      const signer = await ethersProvider.getSigner()

      // Get user's Ethereum public address
      const address = signer.getAddress()

      return await address
    } catch (error) {
      return error
    }
  }

  const getUsers = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet")
      return
    }
    try {
      const contractAddress = "0x2c1279586FA10bB4C2ec19B15Da48e757aDb674a"
      const contract = new ethers.Contract(contractAddress, Wisd.abi, wallet)

      // Read message from smart contract
      const user = await contract.getUser(
        "0x7797Bb0f3dB56167f6102463ea45E2AC1c3b9879",
      )
      console.log("user :>> ", user.id.toString())
      console.log("user :>> ", user.content.toString())

      return address
    } catch (error) {
      console.log("error :>> ", error)
      return error
    }
  }

  const addUser = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet")
      return
    }
    try {
      const contractAddress = CONTRACT_ADDRESSES[morphHolesky.id]
      const contract = new ethers.Contract(contractAddress, Wisd.abi, wallet)

      // Read message from smart contract
      const tx = await contract.addUser("texto", 1)
      await tx.wait()

      return address
    } catch (error) {
      console.log("error :>> ", error)
      return error
    }
  }

  const getBalance = async () => {
    const ethersProvider = new ethers.BrowserProvider(provider!)
    const balance = ethers.formatEther(
      await ethersProvider.getBalance(
        "0xf068A0d8Cde1731b5E74eea45f1D47bb8D8B0f7a",
      ), // Balance is in wei
    )
    console.log("balance :>> ", balance)
  }

  const logout = async () => {
    await web3auth.logout()
    setProvider(null)
    setWallet(null)
    setLoggedIn(false)
    uiConsole("logged out")
  }

  const upload = async () => {
    const response = await fetch("/api/updateKB", {
      method: "post",
    })

    const contentID = await response.json()
    console.log("Resultado final")
    console.log(contentID)
  }

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p")
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2)
      console.log(...args)
    }
  }

  const styles: any = {
    uContainer: {
      height: "100vh",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      zIndex: "1000",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    xmtpContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    btnXmtp: {
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "#000",
      justifyContent: "center",
      border: "1px solid grey",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "14px",
    },
    HomePageWrapperStyle: {
      textAlign: "center",
      marginTop: "2rem",
    },
    ButtonStyledStyle: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 20px",
      borderRadius: "5px",
      marginBottom: "2px",
      border: "none",
      textAlign: "left",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      color: "#333333",
      backgroundColor: "#ededed",
      fontSize: "12px",
    },
  }

  return (
    <div style={styles.HomePageWrapperStyle}>
      <h1>Fixed Web3Auth XMTP Quickstart </h1>
      <button
        className="home-button"
        style={{ ...styles.ButtonStyledStyle, marginLeft: 10 }}
        onClick={() => login()}
      >
        {loggedIn ? "Connected" : "Login with Google"}
      </button>
      <button
        className="home-button"
        style={{ ...styles.ButtonStyledStyle, marginLeft: 10 }}
        onClick={upload}
      >
        upload
      </button>
      {loggedIn && (
        <>
          <button
            className="home-button"
            style={{ ...styles.ButtonStyledStyle, marginLeft: 10 }}
            onClick={() => logout()}
          >
            Logout
          </button>
          <button
            className="home-button"
            style={{ ...styles.ButtonStyledStyle, marginLeft: 10 }}
            onClick={getUsers}
          >
            read users
          </button>
          <button
            className="home-button"
            style={{ ...styles.ButtonStyledStyle, marginLeft: 10 }}
            onClick={addUser}
          >
            add users
          </button>
          <button
            className="home-button"
            style={{ ...styles.ButtonStyledStyle, marginLeft: 10 }}
            onClick={getBalance}
          >
            get balance
          </button>
        </>
      )}
      <h3>{address}</h3>
      {loggedIn && (
        <section className="App-section">
          <button
            className="home-button"
            style={styles.ButtonStyledStyle}
            onClick={() => window.FloatingInbox.open()}
          >
            Open
          </button>
          <button
            className="home-button"
            style={{ ...styles.ButtonStyledStyle, marginLeft: 10 }}
            onClick={() => window.FloatingInbox.close()}
          >
            Close
          </button>
        </section>
      )}
      {loggedIn && <FloatingInbox wallet={wallet} onLogout={logout} />}
    </div>
  )
}

export default App
