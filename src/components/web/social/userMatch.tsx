import { useState } from "react"

import { UserMatchProps } from "@/components/abis/types/generalTypes"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const UserMatch = ({ id, name, shortDescription }: UserMatchProps) => {
  const [isFollowed, setIsFollowed] = useState(false)

  return (
    <div
      key={id}
      // className="cursor-pointer"
      // onClick={() => router.push(`/app/profile/${id}`)}
    >
      <Card className="hover:bg-gray-100/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex justify-between items-center">
            {name}{" "}
            <Button
              size="sm"
              className="py-0 h-6"
              variant={!isFollowed ? "default" : "secondary"}
              onClick={() => setIsFollowed(true)}
            >
              {!isFollowed ? "Follow" : "Followed"}
            </Button>
          </CardTitle>
          <CardDescription className="line-clamp-2 pt-2">
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
  )
}

export default UserMatch
