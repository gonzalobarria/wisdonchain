import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { useWisdContext } from "@/components/web3/context/wisdContext"
import { useAppContext } from "@/components/web3/context/appContext"
import { viewIPFSContent } from "@/lib/utils"

const useUser = () => {
  const router = useRouter()
  const { isLoggedIn, user, coreKitInstance, coreKitStatus } = useAppContext()
  const { contract, getMyUser } = useWisdContext()
  const [isRegistered, setIsRegistered] = useState(false)
  const [myData, setMyData] = useState()

  useEffect(() => {
    const checkUser = async () => {
      if (!contract) return

      const userTmp = await getMyUser()
      if (userTmp != undefined && userTmp?.id !== 0) {
        const userData = await viewIPFSContent(userTmp.content)
        setMyData(userData)
        setIsRegistered(true)
        // router.push("/")
      }

      if (!isLoggedIn) return

      if (userTmp == undefined || userTmp?.id === 0) {
        router.push("/register")
      }
    }

    if (!coreKitInstance || !contract) return
    if (!isLoggedIn) router.push("/")

    checkUser()
  }, [isLoggedIn, user, contract, coreKitInstance])

  return { isRegistered, myData }
}

export default useUser
