import ChatGpt from "@/components/abis/ChatGpt.json"
import {
  ethers,
  Contract,
  TransactionReceipt,
  JsonRpcProvider,
  Wallet,
} from "ethers"

interface Message {
  role: string
  content: string
}

const rpcUrl = process.env.RPC_URL
if (!rpcUrl) throw Error("Missing RPC_URL in .env")
const privateKey = process.env.PRIVATE_KEY
if (!privateKey) throw Error("Missing PRIVATE_KEY in .env")
const contractAddress = process.env.CHAT_CONTRACT_ADDRESS
if (!contractAddress) throw Error("Missing CHAT_CONTRACT_ADDRESS in .env")

const getContract = () => {
  const rpcUrl = process.env.RPC_URL
  if (!rpcUrl) throw Error("Missing RPC_URL in .env")
  const privateKey = process.env.PRIVATE_KEY
  if (!privateKey) throw Error("Missing PRIVATE_KEY in .env")
  const contractAddress = process.env.CHAT_CONTRACT_ADDRESS
  if (!contractAddress) throw Error("Missing CHAT_CONTRACT_ADDRESS in .env")

  const provider = new JsonRpcProvider(rpcUrl)
  const wallet = new Wallet(privateKey, provider)
  const contract = new Contract(contractAddress, ChatGpt.abi, wallet)

  return contract
}

const query = async (contract: Contract, prompt: string, runId: number) => {
  let messages: Message[] = []
  let isAnswered = false
  let response = ""

  const transactionResponse = await contract.addMessage(prompt, runId)
  await transactionResponse.wait()

  while (!isAnswered) {
    let newMessages: Message[] = await getNewMessages(
      contract,
      runId,
      messages.length,
    )

    if (messages.length === 0) {
      if (newMessages.slice(-1)[0]?.role == "assistant") {
        isAnswered = true
        response = newMessages.slice(-1)[0].content
        break
      } else {
        messages = newMessages
        newMessages = newMessages.slice(-1)
      }
    }

    console.log("escuchando :>> ", newMessages.length)
    console.log("messages.length :>> ", messages.length)
    if (newMessages) {
      for (let message of newMessages) {
        console.log("message :>> ", message)

        if (message.role === "assistant") {
          isAnswered = true
          response = message.content
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
  return response
}

export const getRecommendedCourses = async (
  runId: number,
  contract: ethers.Contract,
) => {
  const prompt1 =
    "¿qué pregunta más especifica debo hacer para que me muestre los cursos de los expertos que me ayuden a conseguir mi meta principal o mis intereses generales?. Responde solamente el texto de la pregunta que debo hacer."
  const prompt2 = `. Respóndeme en formato json: [{author: {id: "", name: "", photoURL: "", walletAddress: ""}, course: {id: "",title: "",content: "",imgURL: "",price: ""}}].`

  let output = await query(contract, prompt1, runId)
  output = await query(contract, `${output}${prompt2}`, runId)

  output = output.replaceAll("```json", "")
  output = output.replaceAll("```", "")

  return JSON.parse(output)
}

export const getExpertMatches = async (
  runId: number,
  contract: ethers.Contract,
) => {
  const prompt1 =
    "¿qué pregunta más especifica debo hacer para que me muestre a los expertos que me ayuden a conseguir mi meta principal o mis intereses generales?. Responde solamente el texto de la pregunta que debo hacer."
  const prompt2 = `. Respóndeme en formato json: [{id: "", name: "", shortDescription:""}].`

  let output = await query(contract, prompt1, runId)
  output = await query(contract, `${output}${prompt2}`, runId)

  output = output.replaceAll("```json", "")
  output = output.replaceAll("```", "")

  return JSON.parse(output)
}

export const initialSetup = async (
  email: string,
): Promise<
  | {
      response: string
      runId: number
      contract: ethers.Contract
    }
  | undefined
> => {
  const provider = new JsonRpcProvider(rpcUrl)
  const wallet = new Wallet(privateKey, provider)
  const contract = new Contract(contractAddress, ChatGpt.abi, wallet)

  const prompt = `De aquí en adelante trabajarás para el usuario ${email}, por lo que debes entender toda la información que existe en la plataforma acerca de esa persona.`

  const transactionResponse = await contract.startChat(prompt)
  const receipt = await transactionResponse.wait()

  // Get the chat ID from transaction receipt logs
  let runId = getRunId(receipt, contract)
  console.log(`Created run ID: ${runId}`)
  if (!runId && runId !== 0) {
    return
  }
  let messages: Message[] = []
  let isAnswered = false
  let response = ""

  while (!isAnswered) {
    const newMessages: Message[] = await getNewMessages(
      contract,
      runId,
      messages.length,
    )
    if (newMessages) {
      for (let message of newMessages) {
        messages.push(message)
        if (messages.at(-1)?.role == "assistant") {
          console.log(
            `${messages.slice(-1)[0].role}: ${messages.slice(-1)[0].content}`,
          )
          isAnswered = true
          response = messages.slice(-1)[0].content
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
  return { runId, response, contract }
}

const getRunId = (receipt: TransactionReceipt, contract: Contract) => {
  let runId
  for (const log of receipt.logs) {
    try {
      const parsedLog = contract.interface.parseLog(log)
      if (parsedLog && parsedLog.name === "ChatCreated") {
        // Second event argument
        runId = ethers.toNumber(parsedLog.args[1])
      }
    } catch (error) {
      // This log might not have been from your contract, or it might be an anonymous log
      console.log("Could not parse log:", log)
    }
  }
  return runId
}

async function getNewMessages(
  contract: Contract,
  runId: number,
  currentMessagesCount: number,
): Promise<Message[]> {
  const messages = await contract.getMessageHistory(runId)

  const newMessages: Message[] = []
  messages.forEach((message: any, i: number) => {
    if (i >= currentMessagesCount) {
      newMessages.push({
        role: message[0],
        content: message.content[0].value,
      })
    }
  })
  return newMessages
}
