import { Button } from "@/components/ui/button"
import UserSnippet from "@/components/web/webConnect"
import { useAppContext } from "@/components/web3/context/appContext"

const ConnectButton = () => {
  const { login, logout, user, isLoggedIn } = useAppContext()

  return (
    <>
      {isLoggedIn && user ? (
        <UserSnippet user={user} onLogout={logout} />
      ) : (
        <Button onClick={login}>Login with Google</Button>
      )}
    </>
  )
}

export default ConnectButton
