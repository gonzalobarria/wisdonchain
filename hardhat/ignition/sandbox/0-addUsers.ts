import { Contract, ethers, Wallet } from "ethers"
import WisdABI from "../../artifacts/contracts/WisdOnChain.sol/WisdOnChain.json"
import * as dotenv from "dotenv"

dotenv.config()

async function main() {
  const rpcUrl = process.env.RPC_URL
  if (!rpcUrl) throw Error("Missing RPC_URL in .env")
  const privateKey = process.env.PRIVATE_KEY
  if (!privateKey) throw Error("Missing PRIVATE_KEY in .env")
  const wisdContractAddress = process.env.WISD_CONTRACT_ADDRESS
  if (!wisdContractAddress) throw Error("Missing WISD_CONTRACT_ADDRESS in .env")

  const provider = new ethers.JsonRpcProvider(rpcUrl)
  const wallet = new Wallet(privateKey, provider)
  const contract = new Contract(wisdContractAddress, WisdABI.abi, wallet)

  // const tx = await contract.addUser("sdasda", 0)
  // await tx.wait()

  const users = await contract.getUsers()
  console.log("users :>> ", users)
}

main()
  .then(() => console.log("Done"))
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
