import { ethers, Wallet, JsonRpcProvider } from "ethers"
import chatABI from "@/components/abis/ChatGpt.json"

import { loadInformation } from "./loadInformation"
import { indexKnowledgeBase } from "./requestIndex"
import { uploadToPinata } from "./uploadPinata"

const provider = new JsonRpcProvider(process.env.RPC_URL)
const signer = new Wallet(process.env.PRIVATE_KEY ?? "", provider)

const contractChat = new ethers.Contract(
  process.env.CHAT_CONTRACT_ADDRESS ?? "",
  chatABI.abi,
  signer
)

const updateChatContract = async (cid: string) => {
  const tx = await contractChat.setKnowledgeBase(cid)
  await tx.wait()
}

export const updateKnowledgeBase = async () => {
  const usersAndCourses = await loadInformation()
  const knowledgeBaseCID = await uploadToPinata(usersAndCourses)
  const res = await indexKnowledgeBase(knowledgeBaseCID)

  if (res?.isProcessed && res?.indexCID)
    await updateChatContract(knowledgeBaseCID)

  return res
}
