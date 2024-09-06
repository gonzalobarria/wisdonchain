import { DialogFK } from "@/components/web/mfa/dialogFK"
import MainSocial from "@/components/web/social/main"
import { useAppContext } from "@/components/web3/context/appContext"
import { useWisdContext } from "@/components/web3/context/wisdContext"
import Image from "next/image"
import { useEffect } from "react"

import banner from "../../public/wisd-land.png"

function HomeWisd() {
  const { isLoggedIn, isFKRequired } = useAppContext()
  const { myData } = useWisdContext()

  useEffect(() => {
    if (!isFKRequired) return
  }, [isFKRequired])

  // if (!coreKitInstance || !contract) return

  return (
    <>
      {!isLoggedIn || !myData ? (
        <div className="flex flex-col items-center py-64 gap-4 ">
          <Image
            src={banner}
            alt="Logo Gonzalo Barría M"
            fill
            className="object-cover"
            priority
          />
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
