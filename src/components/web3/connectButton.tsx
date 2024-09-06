import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import UserSnippet from "@/components/web/userSnippet"
import { useAppContext } from "@/components/web3/context/appContext"
import { useWisdContext } from "./context/wisdContext"

const FloatingInbox = dynamic(() => import("@/components/web/FloatingInbox-hooks"), {
  ssr: false,
})

const ConnectButton = () => {
  const { login, logout, user, isLoggedIn, signer } = useAppContext()
  const { myData } = useWisdContext()

  console.log("signer :>> ", signer)
  console.log("myData :>> ", myData)
  return (
    <>
      {isLoggedIn && user ? (
        <>
          <UserSnippet user={user} onLogout={logout} />
          {signer && myData && (
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
