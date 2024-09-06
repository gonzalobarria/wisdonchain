import { useRouter } from "next/router"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type UserMatchesProps = {
  users: { id: string | number; name: string; shortDescription: string }[]
}

const UserMatches = ({ users }: UserMatchesProps) => {
  const router = useRouter()

  return (
    <>
      <div className="grid gap-y-4">
        {users.map(({ id, name, shortDescription }) => (
          <div
            className="cursor-pointer"
            onClick={() => router.push(`/app/profile/${id}`)}
          >
            <Card className="hover:bg-gray-100/50 transition-colors">
              <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {shortDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                <div className="text-center">
                  <h3 className="text-sm font-semibold">Followers</h3>
                  <p className="text-sm">500K</p>
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-semibold">Affinity</h3>
                  <p className="text-sm">78%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}

export default UserMatches
