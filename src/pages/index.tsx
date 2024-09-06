import { DialogFK } from "@/components/web/mfa/dialogFK"
import MainSocial from "@/components/web/social/main"
import { useAppContext } from "@/components/web3/context/appContext"
import { useWisdContext } from "@/components/web3/context/wisdContext"
import { useEffect } from "react"

function HomeWisd() {
  const { coreKitInstance, isLoggedIn, isFKRequired } = useAppContext()
  const { contract, myData } = useWisdContext()

  useEffect(() => {
    console.log("cambio")
    console.log("myData :>> ", myData)
  }, [myData])

  useEffect(() => {
    if (!isFKRequired) return
  }, [isFKRequired])
  console.log("isFKRequired :>> ", isFKRequired)

  // if (!coreKitInstance || !contract) return

  return (
    <>
      {!isLoggedIn || !myData ? (
        <div className="flex flex-col items-center py-64 gap-4 ">
          <h1 className="text-2xl">Welcome to Wisd</h1>
          {isFKRequired && <DialogFK />}
        </div>
      ) : (
        <div className="flex flex-col mx-4 md:mx-10 my-10 md:gap-4 ">
          <MainSocial />
        </div>
      )}
    </>
  )
}

export default HomeWisd
