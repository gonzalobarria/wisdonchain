import { ethers } from "hardhat"
import * as dotenv from "dotenv"

dotenv.config()

async function main() {
  await deployChatGptWithKnowledgeBase("WisdOnChain")
}

async function deployChatGptWithKnowledgeBase(contractName: string) {
  const agent = await ethers.deployContract(contractName)

  await agent.waitForDeployment()

  console.log(`${contractName} deployed to ${agent.target}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
