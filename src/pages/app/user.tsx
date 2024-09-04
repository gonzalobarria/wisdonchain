import UserRegisterForm from "@/components/web/userRegisterForm"
import { useAppContext } from "@/components/web3/context/appContext"
import { useWisdContext } from "@/components/web3/context/wisdContext"
import useUser from "@/hooks/useUser"
import { UserRole } from "@/lib/constants"
import { getConsumer, upload } from "@/lib/utils"
import { useRouter } from "next/router"

const User = () => {
  const router = useRouter()
  const { signer, user } = useAppContext()
  const { updateUser } = useWisdContext()
  const { myData } = useUser()

  const saveData = async (values: any, userRole: number) => {
    if (user && signer && userRole === UserRole.User) {
      const consumer = getConsumer(values, user, signer, userRole)

      const cid = await upload(JSON.stringify(consumer))

      await updateUser(cid)
      router.push("/")
    }
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-8 max-w-4xl mx-auto bg-background m-8 shadow-lg rounded-lg gap-y-5">
      <h1 className="text-2xl font-semibold">My Profile</h1>
      {myData && <UserRegisterForm register={saveData} data={myData} />}
    </div>
  )
}

export default User
