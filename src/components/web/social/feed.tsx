import { cn } from "@/lib/utils"

type FeedProps = {
  className?: string
}

import Course from "./course"
import { ScrollArea } from "@/components/ui/scroll-area"

const coursesRecommended = [
  {
    author: {
      id: "111",
      name: "Isabella Garcia",
      photoURL: "",
      walletAddress: "",
    },
    course: {
      id: "C1101",
      title: "Introduction to Pastry Arts",
      content:
        "A beginner’s course in pastry making, focusing on fundamental techniques and recipes.",
      imgURL: "",
      price: "$100",
    },
  },
  {
    author: {
      id: "111",
      name: "Isabella Garcia",
      photoURL: "",
      walletAddress: "",
    },
    course: {
      id: "C1102",
      title: "Gourmet Cooking Techniques",
      content:
        "An intermediate course on gourmet cooking, covering advanced techniques for creating exquisite dishes.",
      imgURL: "",
      price: "$150",
    },
  },
]

const Feed = ({ className }: FeedProps) => {
  return (
    <div
      className={cn(
        "flex h-[600px] flex-col p-4 md:p-8 max-w-4xls bg-background shadow-lg rounded-lg gap-y-3 md:sticky md:top-24 ",
        className,
      )}
    >
      <h1 className="font-semibold text-xl">Courses for You</h1>
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
