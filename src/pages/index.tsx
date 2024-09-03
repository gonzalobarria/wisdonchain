import MainSocial from "@/components/web/social/main"
import { useWisdContext } from "@/components/web3/context/wisdContext"
import useUser from "@/hooks/useUser"

function HomeWisd() {
  const { contract } = useWisdContext()
  const {} = useUser()

  if (!contract)
    return (
      <div className="flex flex-col items-center py-64 gap-4 ">
        <h1 className="text-2xl">Welcome to Wisd</h1>
      </div>
    )
  else
    return (
      <div className="flex flex-col mx-4 md:mx-10 my-10 md:gap-4 ">
        <MainSocial />
      </div>
    )
}

export default HomeWisd
