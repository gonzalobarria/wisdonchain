import { useRouter } from "next/router"

import UserRegisterForm from "@/components/web/userRegisterForm"
import { useAppContext } from "@/components/web3/context/appContext"
import { useWisdContext } from "@/components/web3/context/wisdContext"
import { UserRole } from "@/lib/constants"
import { getConsumer, getUserRole, upload } from "@/lib/utils"
import ExpertRegisterForm from "@/components/web/expertRegisterForm"

const User = () => {
  const router = useRouter()
  const { signer, user } = useAppContext()
  const { updateUser, myData } = useWisdContext()

  const saveData = async (values: any, userRole: number) => {
    if (user && signer && userRole === UserRole.Consumer) {
      const consumer = getConsumer(values, user, signer, userRole)

      const cid = await upload(JSON.stringify(consumer))

      await updateUser(cid)
      router.push("/")
    }
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-8 max-w-4xl mx-auto bg-background shadow-lg rounded-lg gap-y-5">
      <h1 className="text-2xl font-semibold">My Profile</h1>

      {myData &&
        myData.personalInformation.role === getUserRole(UserRole.Consumer) && (
          <UserRegisterForm register={saveData} data={myData} />
        )}
      {myData &&
        myData.personalInformation.role === getUserRole(UserRole.Expert) && (
          <ExpertRegisterForm register={saveData} data={myData} />
        )}
    </div>
  )
}

export default User
