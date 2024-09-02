import { useEffect, useState } from "react"

import ExpertRegisterForm from "@/components/web/expertRegisterForm"
import UserRegisterForm from "@/components/web/userRegisterForm"
import { useWisdContext } from "@/components/web3/context/wisdContext"
import { Button } from "@/components/ui/button"

const Register = () => {
  const { getMyUser, getAddress, contract, getBalance } = useWisdContext()
  const [userExists, setUserExists] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      if (!contract) return

      const user = await getMyUser()
      if (user == undefined || user?.id === 0) setUserExists(false)
    }
    checkUser()
  }, [contract])

  const getad = async () => {
    await getAddress()
  }

  const getbal = async () => {
    const balance = await getBalance()
    console.log("balance :>> ", balance)
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-8 max-w-4xl mx-auto bg-background m-8 shadow-lg rounded-lg gap-y-5">
      <div className="text-center">
        <h1 className="text-2xl font-semibold underline">
          Let’s Get Started with your Profile!
        </h1>
        <span className="text-sm">Texto para guiar al usuario</span>
      </div>
      <Button onClick={getad}>address</Button>
      <Button onClick={getbal}>balance</Button>
      {!userExists && (
        <>
          {true && <UserRegisterForm />}
          {false && <ExpertRegisterForm />}
        </>
      )}
    </div>
  )
}

export default Register
