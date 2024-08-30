import { ReactNode, createContext, useContext } from "react"

import useContract from "@/hooks/useContract"
import { CONTRACT_ADDRESSES } from "@/lib/constants"
import Wisd from "@/components/abis/WisdOnChain.json"
import { ethers } from "ethers"
import { morphHolesky } from "wagmi/chains"
import { useAppContext } from "./appContext"

type WisdProviderProps = {
  children: ReactNode
}

type WisdContextType = {
  contract: ethers.Contract | null
  getUsers: () => void
  addUser: () => void
  getAddress: () => Promise<string>
}

export const WisdContext = createContext<WisdContextType | null>(null)

const WisdProvider = ({ children }: WisdProviderProps) => {
  const chainId = morphHolesky.id
  const { getSigner, coreKitInstance } = useAppContext()

  const { contract } = useContract({
    contractAddress: CONTRACT_ADDRESSES[chainId],
    ABI: Wisd.abi,
  })

  const addUser = async () => {
    if (!contract) {
      return
    }
    try {
      // Read message from smart contract
      const tx = await contract.addUser("texto", 1)
      await tx.wait()

      return ""
    } catch (error) {
      console.log("error :>> ", error)
      return error
    }
  }

  const getUsers = async () => {
    if (!contract) {
      return
    }
    try {
      //   const signer = await getSigner()
      //   const contract = new ethers.Contract(contractAddress, Wisd.abi, signer)

      const users = await contract.getUsers()
      users.map((u: any) => console.log(u.content))
      console.log("users :>> ", users.length)
      return "ehh"
    } catch (error) {
      console.log("error :>> ", error)
      return error
    }
  }

  const getAddress = async () => {
    if (!coreKitInstance) {
      return ""
    }
    const signer = await getSigner()
    const address = await signer?.getAddress()
    console.log("address :>> ", address)
    return address ?? ""
  }

  return (
    <WisdContext.Provider
      value={{
        addUser,
        contract,
        getUsers,
        getAddress,
      }}
    >
      {children}
    </WisdContext.Provider>
  )
}

export default WisdProvider
export const useWisdContext = () => useContext(WisdContext) as WisdContextType
