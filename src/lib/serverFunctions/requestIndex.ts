import { ethers, Wallet, JsonRpcProvider } from "ethers"
import oracleABI from "@/components/abis/ChatOracle.json"

const provider = new JsonRpcProvider(process.env.RPC_URL)
const signer = new Wallet(process.env.PRIVATE_KEY ?? "", provider)

const contract = new ethers.Contract(
  process.env.ORACLE_ADDRESS ?? "",
  oracleABI.abi,
  signer
)

const getIndexCid = (cid: string) => contract.kbIndexes(cid)

const getIndexingError = (requestId: number) =>
  contract.kbIndexingRequestErrors(requestId)

const isIndexingRequestProcessed = (requestId: number) =>
  contract.isKbIndexingRequestProcessed(requestId)

const requestIndexing = async (cid: string) => {
  try {
    const tx = await contract.addKnowledgeBase(cid)

    const receipt = await tx.wait()

    const event = contract.getEvent("KnowledgeBaseIndexRequestAdded")
    if (event !== null) return parseInt(receipt.logs[0].args.id)
  } catch (error) {
    console.error("Error requesting indexing:", error)
    return null
  }
}

const waitForIndexing = async (
  requestId: number,
  cid: string,
  maxLoops = 120
) => {
  for (let i = 0; i < maxLoops; i++) {
    const indexCID = await getIndexCid(cid)
    const error = await getIndexingError(requestId)
    const isProcessed = await isIndexingRequestProcessed(requestId)

    if (isProcessed) {
      const id = requestId

      return { id, isProcessed, indexCID, error, cid }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
  }
  return {
    id: requestId,
    isProcessed: false,
    indexCID: null,
    cid,
    error: "Timed out waiting for indexing to finish",
  }
}

export const indexKnowledgeBase = async (cid: string) => {
  try {
    const indexCID = await getIndexCid(cid)

    if (indexCID && indexCID[0]) {
      return {
        id: null,
        isProcessed: true,
        indexCID,
        cid,
        error: null,
      }
    }

    const requestId = await requestIndexing(cid)

    if (requestId == undefined) {
      return {
        id: null,
        isProcessed: false,
        indexCID: null,
        cid,
        error: "Failed to request indexing",
      }
    }

    const response = await waitForIndexing(requestId, cid)
    return response
  } catch (error) {
    console.error("Error executing indexing:", error)
    console.error("An error occurred during execution")
  }
}
