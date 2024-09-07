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

      const users = await wisdOnChain.connect(owner).getUsers()

      assert.equal(users[0].content, content)

      const user = await wisdOnChain.connect(account1).getMyUser()

      assert.equal(user.content, content)
    })

    it("Update User", async () => {
      const { wisdOnChain, owner, account1 } =
        await loadFixture(deployWisdOnChain)

      let content = "#$sdfs$!#$"

      await wisdOnChain.connect(account1).addUser(content, UserRole.Expert)

      content = "#$sd111111111"

      await wisdOnChain.connect(account1).updateUser(content)

      let user = await wisdOnChain.connect(account1).getMyUser()

      assert.equal(user.content, content)

      content = "#$sd8888888888"

      await wisdOnChain
        .connect(owner)
        .updateUserByOwner(account1.address, content)

      user = await wisdOnChain.connect(account1).getMyUser()

      assert.equal(user.content, content)
    })

    it("Get Users", async () => {
      const { wisdOnChain, owner, account1, account2 } =
        await loadFixture(deployWisdOnChain)

      let content1 = "#$sdfs$!#$"
      await wisdOnChain.connect(account1).addUser(content1, UserRole.Expert)

      let content2 = "XXXXX"
      await wisdOnChain.connect(account2).addUser(content2, UserRole.Consumer)

      const users = await wisdOnChain.connect(owner).getUsers()

      assert.equal(users.length, 2)
      assert.equal(users[0].content, content1)
      assert.equal(users[1].content, content2)
    })

    it("Add Course", async () => {
      const { wisdOnChain, owner, account1 } =
        await loadFixture(deployWisdOnChain)

      let content = "#$sdfs$!#$"
      let name = "The Time Machine"

      await wisdOnChain.connect(account1).addUser(content, UserRole.Expert)

      const users = await wisdOnChain.connect(owner).getUsers()

      assert.equal(users[0].content, content)

      await wisdOnChain.connect(account1).addCourse(name, content)

      const idCourse = 1
      const course = await wisdOnChain.connect(account1).getCourse(idCourse)
      assert.equal(course.id, BigInt(idCourse))
    })

    it("Get Courses", async () => {
      const { wisdOnChain, owner, account1, account2 } =
        await loadFixture(deployWisdOnChain)

      let content = "#$sdfs$!#$"
      let name = "The Time Machine"

      await wisdOnChain.connect(account1).addUser(content, UserRole.Expert)

      content = "#//&GHGHJ$%&/67676767"

      await wisdOnChain.connect(account2).addUser(content, UserRole.Expert)

      const users = await wisdOnChain.connect(owner).getUsers()

      assert.equal(users[1].content, content)

      await wisdOnChain.connect(account1).addCourse(name, content)

      content = "#//&GHGHJ$"
      name = "The Lord"

      await wisdOnChain.connect(account2).addCourse(name, content)

      const courses = await wisdOnChain.connect(account1).getCourses()
      assert.equal(courses[1].name, name)

      const course = await wisdOnChain
        .connect(account1)
        .getCourse(courses[1].id)
      assert.equal(course.name, name)
    })

    it("Expect to fail getCourses - user not owner", async () => {
      const { wisdOnChain, account1 } = await loadFixture(deployWisdOnChain)

      await expect(wisdOnChain.connect(account1).getUsers()).to.be.revertedWith(
        "Ownable: caller is not the owner",
      )
    })

    it("Expect to fail update user - user not owner", async () => {
      const { wisdOnChain, account1 } = await loadFixture(deployWisdOnChain)

      let content = "#$sdfs$!#$"

      await wisdOnChain.connect(account1).addUser(content, UserRole.Expert)

      content = "#$sd8888888888"

      await expect(
        wisdOnChain
          .connect(account1)
          .updateUserByOwner(account1.address, content),
      ).to.be.revertedWith("Ownable: caller is not the owner")
    })

    it("Expect to fail add course - user not exists", async () => {
      const { wisdOnChain, account1 } = await loadFixture(deployWisdOnChain)

      let content = "#$sdfs$!#$"
      let name = "The Time Machine"

      await expect(
        wisdOnChain.connect(account1).addCourse(name, content),
      ).to.be.revertedWith("User does not exist")
    })

    it("Expect to fail add course - course created", async () => {
      const { wisdOnChain, account1 } = await loadFixture(deployWisdOnChain)

      let content = "#$sdfs$!#$"
      let name = "The Time Machine"

      await wisdOnChain.connect(account1).addUser(content, UserRole.Expert)

      await wisdOnChain.connect(account1).addCourse(name, content)

      await expect(
        wisdOnChain.connect(account1).addCourse(name, content),
      ).to.be.revertedWith("Course already created for the expert")
    })

    it("Expect to fail add course - user not expert", async () => {
      const { wisdOnChain, account1 } = await loadFixture(deployWisdOnChain)

      let content = "#$sdfs$!#$"
      let name = "The Time Machine"

      await wisdOnChain.connect(account1).addUser(content, UserRole.Consumer)

      await expect(
        wisdOnChain.connect(account1).addCourse(name, content),
      ).to.be.revertedWith("User is not an Expert")
    })
  })
})
