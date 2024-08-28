import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { ethers } from "hardhat"
import { UserRole } from "./enums"
import { assert, expect } from "chai"

describe("WisdOnChain", function () {
  async function deployWisdOnChain() {
    const [owner, account1, account2] = await ethers.getSigners()

    const WisdOnChain = await ethers.getContractFactory("WisdOnChain")

    const wisdOnChain = await WisdOnChain.deploy()

    return { wisdOnChain, owner, account1, account2 }
  }

  describe("Adding Basics", function () {
    it("Add User", async () => {
      const { wisdOnChain, owner, account1 } =
        await loadFixture(deployWisdOnChain)

      let content = "#$sdfs$!#$"

      await wisdOnChain.connect(account1).addUser(content, UserRole.Expert)

      const user = await wisdOnChain.connect(owner).getUser(account1)

      assert.equal(user.content, content)
    })

    it("Get Users", async () => {
      const { wisdOnChain, owner, account1, account2 } =
        await loadFixture(deployWisdOnChain)

      let content1 = "#$sdfs$!#$"
      await wisdOnChain.connect(account1).addUser(content1, UserRole.Expert)

      let content2 = "XXXXX"
      await wisdOnChain.connect(account2).addUser(content2, UserRole.User)

      const users = await wisdOnChain.connect(owner).getUsers()

      assert.equal(users.length, 2)
      assert.equal(users[0].content, content1)
      assert.equal(users[1].content, content2)
    })

    it("Add Course", async () => {
      const { wisdOnChain, owner, account1 } =
        await loadFixture(deployWisdOnChain)

      let content = "#$sdfs$!#$"
      let courseName = "The Time Machine"

      await wisdOnChain.connect(account1).addUser(content, UserRole.Expert)

      const user = await wisdOnChain.connect(owner).getUser(account1)

      assert.equal(user.content, content)

      await wisdOnChain.connect(account1).addCourse(courseName, content)

      const idCourse = 0
      const course = await wisdOnChain.connect(account1).getCourse(idCourse)
      assert.equal(course.id, BigInt(idCourse))
    })

    it("Expect to fail add course - user not exists", async () => {
      const { wisdOnChain, owner, account1 } =
        await loadFixture(deployWisdOnChain)

      let content = "#$sdfs$!#$"
      let courseName = "The Time Machine"

      await expect(
        wisdOnChain.connect(account1).addCourse(courseName, content),
      ).to.be.rejectedWith("User does not exists")
    })

    it("Expect to fail add course - course created", async () => {
      const { wisdOnChain, owner, account1 } =
        await loadFixture(deployWisdOnChain)

      let content = "#$sdfs$!#$"
      let courseName = "The Time Machine"

      await wisdOnChain.connect(account1).addUser(content, UserRole.Expert)

      await wisdOnChain.connect(account1).addCourse(courseName, content)

      await expect(
        wisdOnChain.connect(account1).addCourse(courseName, content),
      ).to.be.rejectedWith("Course already created for the expert")
    })

    it("Expect to fail add course - user not expert", async () => {
      const { wisdOnChain, owner, account1 } =
        await loadFixture(deployWisdOnChain)

      let content = "#$sdfs$!#$"
      let courseName = "The Time Machine"

      await wisdOnChain.connect(account1).addUser(content, UserRole.User)

      await expect(
        wisdOnChain.connect(account1).addCourse(courseName, content),
      ).to.be.rejectedWith("User is not an Expert")
    })
  })
})
