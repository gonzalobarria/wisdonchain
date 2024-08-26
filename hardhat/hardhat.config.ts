import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import * as dotenv from "dotenv"

dotenv.config()

const galadrielDevnet = []
if (process.env.PRIVATE_KEY_GALADRIEL) {
  galadrielDevnet.push(process.env.PRIVATE_KEY_GALADRIEL)
}

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "localhost",
  networks: {
    galadriel: {
      chainId: 696969,
      url: "https://devnet.galadriel.com/",
      accounts: galadrielDevnet,
    },
  },
}

export default config
