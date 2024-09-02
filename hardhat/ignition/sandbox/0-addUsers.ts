import { Contract, ethers, Wallet } from "ethers"
import WisdABI from "../../artifacts/contracts/WisdOnChain.sol/WisdOnChain.json"
import * as dotenv from "dotenv"

dotenv.config()

async function main() {
  const rpcUrl = process.env.MORPH_RPC_URL
  if (!rpcUrl) throw Error("Missing MORPH_RPC_URL in .env")
  const privateKey = process.env.PRIVATE_KEY
  if (!privateKey) throw Error("Missing PRIVATE_KEY in .env")
  const wisdContractAddress = process.env.WISD_CONTRACT_ADDRESS
  if (!wisdContractAddress) throw Error("Missing WISD_CONTRACT_ADDRESS in .env")

  const provider = new ethers.JsonRpcProvider(rpcUrl)
  const wallet = new Wallet(privateKey, provider)
  const contract = new Contract(wisdContractAddress, WisdABI.abi, wallet)

  let balanceTmp = await provider.getBalance(wallet.address)
  console.log("balance wal :>> ", ethers.formatEther(balanceTmp))

  // const tx1 = await contract.deposit({ value: ethers.parseEther("1") })
  // await tx1.wait()

  balanceTmp = await provider.getBalance(wisdContractAddress)
  console.log("balance cn :>> ", ethers.formatEther(balanceTmp))

  const wallet2 = new Wallet(
    "0xbf3893b8e106bbd6172b8655e9020792589ccf54c65c9b0dd7e9d863bddb8c8f",
    provider,
  )

  balanceTmp = await provider.getBalance(
    "0x71F60B8bC5Cc97F26eDA4336b14cEb7E92399d61",
  )
  console.log("balance pre creación :>> ", ethers.formatEther(balanceTmp))
  console.log("balance pre creación :>> ", balanceTmp)

  // try {

  //   console.log("wallet2.address :>> ", wallet2.address)
  //   const tx2 = await contract.transferEther(
  //     wallet2.address,
  //     ethers.parseEther("0.1"),
  //   )
  //   await tx2.wait()
  // } catch (error) {
  //   console.log('ya tiene fondos');
  // }

  balanceTmp = await provider.getBalance(wallet2.address)
  console.log("balance post creación :>> ", ethers.formatEther(balanceTmp))

  // console.log("wallet2.privateKey :>> ", wallet2.privateKey)

  // try {
  //   const contract2 = new Contract(wisdContractAddress, WisdABI.abi, wallet2)
  //   const tx = await contract2.addUser("sdasda", 0)
  //   await tx.wait()
  // } catch (error) {
  //   console.log("ya estácreado", error)
  // }

  balanceTmp = await provider.getBalance(wallet2.address)
  console.log("balance post adduser :>> ", ethers.formatEther(balanceTmp))

  const users = await contract.getUsers()
  console.log("users :>> ", users)

  // const tx5 = await contract.withdrawMoney()
  // await tx5.wait()

  // balanceTmp = await provider.getBalance(
  //   "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  // )
  console.log("balance cn :>> ", ethers.formatEther(balanceTmp))
}

main()
  .then(() => console.log("Done"))
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
