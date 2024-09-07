import { useWisdContext } from "@/components/web3/context/wisdContext"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Profile = () => {
  const router = useRouter()
  const { getUser, contract } = useWisdContext()
  const [user, setUser] = useState()

  useEffect(() => {
    const asyncFunc = async () => {
      if (!contract) return
      if (router.query.id == undefined || router.query.id === "") return

      const userId = parseInt(router.query.id as string)
      const tmp = await getUser(userId)
      if (!tmp) return

      setUser(tmp.content)
    }

    asyncFunc()
  }, [router.query.id, contract])

  return (
    <p>
      Post: {router.query.id}
      {/* {user && <h1>{user.personalInformation.nickname}</h1>} */}
    </p>
  )

  // return <></>
}

export default Profile
