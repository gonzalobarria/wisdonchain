import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppContext } from "@/components/web3/context/appContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const BarAddPost = () => {
  const { user } = useAppContext()

  return (
    <div className="flex bg-background p-2 w-full rounded-lg  gap-x-2 items-center">
      <div className="shadow-xl w-fit rounded-full border border-gray-500/40 z-10">
        {user && (
          <Avatar>
            {/* @ts-ignore */}
            <AvatarImage src={user.picture} alt={user.name} />
            <AvatarFallback>WS</AvatarFallback>
          </Avatar>
        )}
      </div>
      <Input placeholder="What are you thinkng?" />
      <Button type="submit">New Post</Button>
    </div>
  )
}

export default BarAddPost
