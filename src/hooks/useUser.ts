import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { useWisdContext } from "@/components/web3/context/wisdContext"
import { useAppContext } from "@/components/web3/context/appContext"

const useUser = () => {
  const router = useRouter()
  const { isLoggedIn, user } = useAppContext()
  const { contract, getMyUser } = useWisdContext()
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      if (!contract) return

      const user = await getMyUser()
      if (user != undefined && user?.id !== 0) {
        setIsRegistered(true)
        router.push("/")
      }

      if (user == undefined || user?.id === 0) {
        router.push("/register")
      }
    }

    if (!isLoggedIn || !user || isRegistered) return

    checkUser()
  }, [isLoggedIn, user, contract])

  return { isRegistered }
}

export default useUser
