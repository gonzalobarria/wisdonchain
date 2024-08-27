import { ethers } from "hardhat"
import * as dotenv from "dotenv"

dotenv.config()

async function main() {
  const oracleAddress: string = process.env.ORACLE_ADDRESS ?? ""

  await deployChatGptWithKnowledgeBase("ChatGpt", oracleAddress)
}

async function deployChatGptWithKnowledgeBase(
  contractName: string,
  oracleAddress: string,
) {
  const agent = await ethers.deployContract(contractName, [oracleAddress], {})

  await agent.waitForDeployment()

  console.log(`${contractName} deployed to ${agent.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
