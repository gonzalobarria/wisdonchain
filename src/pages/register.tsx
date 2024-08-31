import { useEffect, useState } from "react"

import ExpertRegisterForm from "@/components/web/expertRegisterForm"
import UserRegisterForm from "@/components/web/userRegisterForm"
import { useWisdContext } from "@/components/web3/context/wisdContext"

const Register = () => {
  const { getMyUser } = useWisdContext()
  const [userExists, setUserExists] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const user = await getMyUser()
      if (user == undefined || user?.id === 0) setUserExists(false)
    }
    checkUser()
  }, [])

  return (
    <div className="flex flex-1 flex-col p-4 md:p-8 max-w-4xl mx-auto bg-background m-8 shadow-lg rounded-lg gap-y-5">
      <div className="text-center">
        <h1 className="text-2xl font-semibold underline">
          Let’s Get Started with your Profile!
        </h1>
        <span className="text-sm">Texto para guiar al usuario</span>
      </div>
      {!userExists && (
        <>
          {false && <UserRegisterForm />}
          <ExpertRegisterForm />
        </>
      )}
    </div>
  )
}

export default Register
