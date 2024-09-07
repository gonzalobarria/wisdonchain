import { Contract, ethers, Wallet } from "ethers"
import ABI from "@/components/abis/WisdOnChain.json"
import { CONTRACT_ADDRESSES } from "../constants"
import { morphHolesky } from "wagmi/chains"
import { decryptCID } from "../web3"

import { experts } from "@/data/demoData/experts"
import { consumers } from "@/data/demoData/consumer"

export const loadInformation = async () => {
  const rpcUrl = process.env.MORPH_RPC_URL
  if (!rpcUrl) throw Error("Missing MORPH_RPC_URL in .env")
  const privateKey = process.env.PRIVATE_KEY
  if (!privateKey) throw Error("Missing PRIVATE_KEY in .env")
  const contractAddress = CONTRACT_ADDRESSES[morphHolesky.id]

  const provider = new ethers.JsonRpcProvider(rpcUrl)
  const wallet = new Wallet(privateKey, provider)
  const contract = new Contract(contractAddress, ABI.abi, wallet)

  const users = await contract.getUsers()

  const tmp = await users.map(async (u: any) =>
    JSON.parse(await decryptCID(u.content)),
  )
  let userList = await Promise.all(tmp)

  const documents = [...experts, ...consumers, ...userList]

  const salida = documents.map((d, idx) => ({
    content: d,
    metadata: { source: `${d.personalInformation.role}-${idx}.json` },
  }))

  return salida.map((d) => ({ ...d, content: JSON.stringify(d.content) }))
}
