import { Contract, ethers, Wallet } from "ethers"
import ABI from "@/components/abis/WisdOnChain.json"
import { CONTRACT_ADDRESSES, initialFund } from "../constants"
import { hardhat, morphHolesky } from "wagmi/chains"

export const fundWallet = async (userAddress: string) => {
  const rpcUrl = process.env.MORPH_RPC_URL
  if (!rpcUrl) throw Error("Missing MORPH_RPC_URL in .env")
  const privateKey = process.env.PRIVATE_KEY
  if (!privateKey) throw Error("Missing PRIVATE_KEY in .env")
  const contractAddress = CONTRACT_ADDRESSES[morphHolesky.id]

  const provider = new ethers.JsonRpcProvider(rpcUrl)
  const wallet = new Wallet(privateKey, provider)
  const contract = new Contract(contractAddress, ABI.abi, wallet)

  try {
    const tx1 = await contract.transferEther(
      userAddress,
      ethers.parseEther(initialFund)
    )
    await tx1.wait()
  } catch (error) {
    throw error
  }
}
