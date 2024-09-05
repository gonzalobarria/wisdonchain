import { askChat, cn } from "@/lib/utils"

type FeedProps = {
  className?: string
}

import Course from "./course"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"
import { useAppContext } from "@/components/web3/context/appContext"

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
  {
    author: {
      id: "111",
      name: "Isabella Garcia",
      photoURL: "",
      walletAddress: "",
    },
    course: {
      id: "C1103",
      title: "Mastering French Pastries",
      content:
        "An advanced course focused on creating classic and modern French pastries, perfecting techniques and presentation.",
      imgURL: "",
      price: "$200",
    },
  },
  {
    author: {
      id: "104",
      name: "Marco Rossi",
      photoURL: "",
      walletAddress: "",
    },
    course: {
      id: "C401",
      title: "Introduction to Italian Cuisine",
      content:
        "Learn the basics of Italian cooking, including pasta making and traditional dishes.",
      imgURL: "",
      price: "$80",
    },
  },
  {
    author: {
      id: "104",
      name: "Marco Rossi",
      photoURL: "",
      walletAddress: "",
    },
    course: {
      id: "C402",
      title: "Mastering the Art of Baking",
      content:
        "Advanced baking techniques for creating professional-level pastries and desserts.",
      imgURL: "",
      price: "$150",
    },
  },
]

const Feed = ({ className }: FeedProps) => {
  const [coursesRecommended2, setCoursesRecommended] = useState([])

  const { user, signer } = useAppContext()

  useEffect(() => {
    const getRecommendedCourses = async () => {
      if (!user) return

      const xx = await askChat({
        context: "recommendedCourses",
        email: user.email,
        walletAddress: signer?.address,
      })
      console.log("xx :>> ", xx)
      setCoursesRecommended(xx.output)
    }

    // getRecommendedCourses()
  }, [user])

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
