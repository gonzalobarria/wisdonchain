import { useAppContext } from "@/components/web3/context/appContext"
import { getSignedContract } from "@/lib/web3"
import { ethers, Interface, InterfaceAbi } from "ethers"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

type ContractProps = {
  contractAddress: string
  ABI: Interface | InterfaceAbi
}

const useContract = ({ contractAddress, ABI }: ContractProps) => {
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [address, setAddress] = useState("")
  const { getSigner, isLoggedIn, coreKitInstance } = useAppContext()

  useEffect(() => {
    if (!isLoggedIn && contract) {
      setContract(null)
      return
    }

    if (isLoggedIn && !contract) setWisdContract()
  }, [isLoggedIn, contract])

  const setWisdContract = async () => {
    if (!isLoggedIn || !coreKitInstance) return

    const signer = await getSigner()
    const contract = new ethers.Contract(contractAddress, ABI, signer)
    const address = await signer?.getAddress()

    if (!address) return

    setAddress(address)
    setContract(contract)
  }

  return { contract, address }
}

export default useContract
