import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserInfo } from "@web3auth/mpc-core-kit"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type WebConnectProps = {
  user: UserInfo & { picture?: string }
  onLogout: () => void
}
const UserSnippet = ({ user, onLogout }: WebConnectProps) => {
  return (
    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <div className="ml-auto flex-1 sm:flex-initial">
        <div className="flex flex-col items-end">
          {user && (
            <>
              <h3 className="text-sm">{user.name}</h3>
              <h3 className="text-xs font-extralight text-gray-400">{user.email}</h3>
            </>
          )}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback>WS</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserSnippet
