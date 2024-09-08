import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type DashboardProps = {
  className?: string
}

const Dashboard = ({ className }: DashboardProps) => {
  return (
    <div
      className={cn(
        "flex h-[600px] flex-col p-4 md:p-8 max-w-4xls bg-background shadow-lg rounded-lg gap-y-3 md:sticky md:top-24 ",
        className,
      )}
    >
      <h2 className="font-semibold text-xl">Your Dashboard</h2>

      <Card className="hover:bg-gray-100/50 hover:scale-[1.02] transition-all duration-300">
        <CardHeader className="py-3">
          <CardTitle className="flex justify-between items-center">
            <h3 className="font-normal">Follower Count</h3>
            <p>6.2K</p>
          </CardTitle>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-2  gap-x-4">
        <Card className="hover:bg-gray-100/50 hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="py-3">
            <CardTitle className="flex flex-col gap-y-5">
              <h3 className="font-normal">Monthly Visits to Profile</h3>
              <p className="text-lg">1.7 K</p>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="hover:bg-gray-100/50 hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="py-3">
            <CardTitle className="flex flex-col gap-y-5">
              <h3 className="font-normal">Content Interaction</h3>
              <p>72%</p>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      <Card className="hover:bg-gray-100/50 hover:scale-[1.02] transition-all duration-300">
        <CardHeader className="py-3">
          <CardTitle className="flex justify-between items-center">
            <h3 className="font-normal">Monthly Income</h3>
            <p>$782.5</p>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Last Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="grid">
          <div
            key={1}
            className="hover:bg-gray-100/50 hover:scale-[1.02] transition-all duration-300 py-2"
          >
            <h3 className="font-semibold text-sm hover:underline hover:cursor-pointer">
              How to spot the best bakery in your city
            </h3>
            <CardDescription className="line-clamp-1">
            </CardDescription>
          </div>
          <div
            key={2}
            className="hover:bg-gray-100/50 hover:scale-[1.02] transition-all duration-300 py-2"
          >
            <h3 className="font-semibold text-sm hover:underline hover:cursor-pointer">
              What you didn&apos;t know about the famous Croissant
            </h3>
            <CardDescription className="line-clamp-1">
            </CardDescription>
          </div>
          <div
            key={3}
            className="hover:bg-gray-100/50 hover:scale-[1.02] transition-all duration-300 py-2"
          >
            <h3 className="font-semibold text-sm hover:underline hover:cursor-pointer">
              All things sweet for the Autumn!!
            </h3>
            <CardDescription className="line-clamp-1">
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
