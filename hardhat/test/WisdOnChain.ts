import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs"
import { expect } from "chai"
import hre, { ethers } from "hardhat"

describe("WisdOnChain", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployWisdOnChain() {
    const [owner, account1] = await ethers.getSigners()

    const WisdOnChain = await ethers.getContractFactory("WisdOnChain")

    const wisdOnChain = await WisdOnChain.deploy()

    return { wisdOnChain, owner, account1 }
  }

  describe("Test Contract", function () {
    it("Test 1", async () => {
      const { wisdOnChain } = await loadFixture(deployWisdOnChain)
    })
  })
})
