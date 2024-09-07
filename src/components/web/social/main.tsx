import { useWisdContext } from "@/components/web3/context/wisdContext"
import Center from "./center"
import Feed from "./feed"
import Right from "./right"
import { getUserRole } from "@/lib/utils"
import { UserRole } from "@/lib/constants"
import Dashboard from "./dashboard"
import RightExperts from "./rightExperts"

const MainSocial = () => {
  const { myData } = useWisdContext()
  return (
    <div className="grid md:grid-cols-7 gap-x-10">
      {myData && (
        <>
          {myData.personalInformation.role === getUserRole(UserRole.Expert) && (
            <Dashboard className="md:col-span-2" />
          )}
          {myData.personalInformation.role ===
            getUserRole(UserRole.Consumer) && (
            <Feed className="md:col-span-2" />
          )}
        </>
      )}
      <Center className="md:col-span-3" />
      {myData.personalInformation.role === getUserRole(UserRole.Consumer) && (
        <Right className="md:col-span-2" />
      )}
      {myData.personalInformation.role === getUserRole(UserRole.Expert) && (
        <RightExperts className="md:col-span-2" />
      )}
    </div>
  )
}

export default MainSocial
