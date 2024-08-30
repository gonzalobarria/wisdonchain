import { ReactNode, createContext, useContext } from "react"

import useContract from "@/hooks/useContract"
import { CONTRACT_ADDRESSES } from "@/lib/constants"
import Wisd from "@/components/abi/WisdOnChain.json"
import { ethers } from "ethers"
import { morphHolesky } from "wagmi/chains"

type WisdProviderProps = {
  children: ReactNode
}

type WisdContextType = {
  contract: ethers.Contract | null
}

export const WisdContext = createContext<WisdContextType | null>(null)

const WisdProvider = ({ children }: WisdProviderProps) => {
  const chainId = morphHolesky.id

  const { contract /* isConnected */ } = useContract({
    contractAddress: CONTRACT_ADDRESSES[chainId],
    ABI: Wisd.abi,
  })

  return (
    <WisdContext.Provider
      value={{
        contract,
      }}
    >
      {children}
    </WisdContext.Provider>
  )
}

export default WisdProvider
export const useWisdContext = () => useContext(WisdContext) as WisdContextType
