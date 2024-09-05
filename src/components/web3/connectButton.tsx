import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import UserSnippet from "@/components/web/webConnect"
import { useAppContext } from "@/components/web3/context/appContext"
import useUser from "@/hooks/useUser"

const FloatingInbox = dynamic(() => import("@/pages/FloatingInbox-hooks"), {
  ssr: false,
})

const ConnectButton = () => {
  const { login, logout, user, isLoggedIn, signer } = useAppContext()
  const { myData } = useUser()

  return (
    <>
      {isLoggedIn && user ? (
        <>
          <UserSnippet user={user} onLogout={logout} />
          {signer && myData &&  (
            <FloatingInbox wallet={signer} onLogout={logout} />
          )}
        </>
      ) : (
        <Button onClick={login}>Login with Google</Button>
      )}
    </>
  )
}

export default ConnectButton
