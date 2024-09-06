import { askRecommendedCourses, cn } from "@/lib/utils"

type FeedProps = {
  className?: string
}

import Course from "./course"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"
import { useAppContext } from "@/components/web3/context/appContext"

const Feed = ({ className }: FeedProps) => {
  const [coursesRecommended, setCoursesRecommended] = useState([])

  const { user } = useAppContext()

  useEffect(() => {
    const getRecommendedCourses = async () => {
      if (!user) return

      const res = await askRecommendedCourses({
        context: "recommendedCourses",
        email: user.email,
      })

      setCoursesRecommended(res.output)
    }

    setTimeout(() => {
      // getRecommendedCourses()
    }, 5000)
  }, [user])

  return (
    <div
      className={cn(
        "flex h-[600px] flex-col p-4 md:p-8 max-w-4xls bg-background shadow-lg rounded-lg gap-y-3 md:sticky md:top-24 ",
        className,
      )}
    >
      <h2 className="font-semibold text-xl">Courses for You</h2>
      <ScrollArea>
        {coursesRecommended.map(
          ({
            author: { name, photoURL, walletAddress },
            course: { id, title, content, price, imgURL },
          }) => (
            <Course
              key={id}
              title={title}
              content={content}
              price={price}
              courseImage={imgURL}
              authorName={name}
              authorImage={photoURL}
              walletAddress={walletAddress}
            />
          ),
        )}
      </ScrollArea>
    </div>
  )
}

export default Feed
