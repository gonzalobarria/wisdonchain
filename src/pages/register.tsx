import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import ExpertRegisterForm from "@/components/web/expertRegisterForm"
import UserRegisterForm from "@/components/web/userRegisterForm"
import { useWisdContext } from "@/components/web3/context/wisdContext"
import { Button } from "@/components/ui/button"
import { getUserRole, upload } from "@/lib/utils"
import { UserRole } from "@/lib/constants"
import useUser from "@/hooks/useUser"

const Register = () => {
  const router = useRouter()
  const { addUser } = useWisdContext()
  const [role, setRole] = useState<number | undefined>()
  const {} = useUser()

  const register = async (values: any, userRole: number): Promise<void> => {
    const cid = await upload(
      JSON.stringify({ ...values, userRole: getUserRole(userRole) }),
    )

    await addUser(cid, userRole)
    router.push("/")
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-8 max-w-4xl mx-auto bg-background m-8 shadow-lg rounded-lg gap-y-5">
      <div className="text-center">
        <h1 className="text-2xl font-semibold underline">
          Let’s Get Started with your Profile!
        </h1>
        <span className="text-sm">Texto para guiar al usuario</span>
      </div>
      <div className="flex">
        <Button onClick={() => setRole(UserRole.User)}>User</Button>
        <Button onClick={() => setRole(UserRole.Expert)}>Expert</Button>
      </div>
      <>
        {role === UserRole.User && <UserRegisterForm register={register} />}
        {role === UserRole.Expert && <ExpertRegisterForm register={register} />}
      </>
    </div>
  )
}

export default Register
