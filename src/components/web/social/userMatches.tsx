import { useRouter } from "next/router"

import UserMatch from "./userMatch"
import { UserMatchProps } from "@/components/abis/types/generalTypes"

type UserMatchesProps = {
  users: UserMatchProps[]
}

const UserMatches = ({ users }: UserMatchesProps) => (
  <div className="grid gap-y-4">
    {users.map(({ id, name, shortDescription }) => (
      <UserMatch
        key={id}
        id={id}
        name={name}
        shortDescription={shortDescription}
      />
    ))}
  </div>
)

export default UserMatches
