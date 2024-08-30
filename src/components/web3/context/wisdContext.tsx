import { ReactNode, createContext, useContext } from "react"
import { ethers } from "ethers"
import { morphHolesky } from "wagmi/chains"

import Wisd from "@/components/abis/WisdOnChain.json"
import { WisdOnChain } from "@/components/abis/types/WisdOnChain"
import useContract from "@/hooks/useContract"
import { CONTRACT_ADDRESSES } from "@/lib/constants"

import { useAppContext } from "./appContext"

type WisdProviderProps = {
  children: ReactNode
}

type WisdContextType = {
  contract: ethers.Contract | null
  getUsers: () => Promise<WisdOnChain.UserStruct[] | undefined>
  addUser: (content: string, userRole: number) => Promise<void>
  getAddress: () => Promise<string | undefined>
}

export const WisdContext = createContext<WisdContextType | null>(null)

const WisdProvider = ({ children }: WisdProviderProps) => {
  const chainId = morphHolesky.id
  const { getSigner, coreKitInstance } = useAppContext()

  const { contract } = useContract({
    contractAddress: CONTRACT_ADDRESSES[chainId],
    ABI: Wisd.abi,
  })

  const addUser = async (content: string, userRole: number): Promise<void> => {
    if (!contract) return

    try {
      const tx = await contract.addUser(content, userRole)
      await tx.wait()
    } catch (error) {
      console.log("error :>> ", error)
    }
  }

  const getUsers = async (): Promise<WisdOnChain.UserStruct[] | undefined> => {
    if (!contract) return

    try {
      const users = await contract.getUsers()
      return users
    } catch (error) {
      console.log("error :>> ", error)
    }
  }

  const getAddress = async (): Promise<string | undefined> => {
    if (!coreKitInstance) return

    try {
      const signer = await getSigner()
      const address = await signer?.getAddress()
      console.log("address :>> ", address)
      return address ?? ""
    } catch (error) {
      console.log("error :>> ", error)
    }
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
