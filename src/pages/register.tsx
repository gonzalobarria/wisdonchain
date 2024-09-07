import { useState } from "react"
import { useRouter } from "next/router"

import ExpertRegisterForm from "@/components/web/expertRegisterForm"
import UserRegisterForm from "@/components/web/userRegisterForm"
import { useWisdContext } from "@/components/web3/context/wisdContext"
import { Button } from "@/components/ui/button"
import { getConsumer, getExpert, upload } from "@/lib/utils"
import { UserRole } from "@/lib/constants"
import { useAppContext } from "@/components/web3/context/appContext"

const Register = () => {
  const router = useRouter()
  const { user, signer } = useAppContext()
  const { addUser } = useWisdContext()
  const [role, setRole] = useState<number | undefined>()

  const register = async (values: any, userRole: number): Promise<void> => {
    if (!user || !signer) return

    let tmpUser

    if (userRole === UserRole.Consumer)
      tmpUser = getConsumer(values, user, signer, userRole)

    if (userRole === UserRole.Expert)
      tmpUser = getExpert(values, user, signer, userRole)

    const cid = await upload(JSON.stringify(tmpUser))
    await addUser(cid, userRole)
    router.push("/")
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-8 max-w-4xl mx-auto bg-background m-8 shadow-lg rounded-lg gap-y-10">
      <div className="text-center">
        <h1 className="text-2xl font-semibold underline">
          Let&apos;s Get Started with your Profile!
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-lg text-center">
          Select what kind of your you want to be
        </h2>
        <div className="flex mx-auto gap-x-10">
          <Button onClick={() => setRole(UserRole.Consumer)}>Consumer</Button>
          <Button onClick={() => setRole(UserRole.Expert)}>Expert</Button>
        </div>
        <>
          {role === UserRole.Consumer && (
            <UserRegisterForm register={register} />
          )}
          {role === UserRole.Expert && (
            <ExpertRegisterForm register={register} />
          )}
        </>
      </div>
    </div>
  )
}

export default Register
