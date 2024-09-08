import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useWisdContext } from "@/components/web3/context/wisdContext"

import expertDefaultImage from "../../../../public/expertDefaultImage.jpg"
import defaultCourseImage from "../../../../public/bakery.jpg"

type CourseProps = {
  title: string
  content: string
  courseImage: string
  price: string
  authorName: string
  authorImage: string
  walletAddress: string
}

const Course = ({
  title,
  content,
  price,
  courseImage,
  authorName,
  authorImage,
  walletAddress,
}: CourseProps) => {
  const { setUserChatAddress } = useWisdContext()

  const chatWith = (address: string) => {
    setUserChatAddress(address)
    window.FloatingInbox.open()
  }

  return (
    <div className="grid rounded-lg shadow-md border-2 border-gray-500/10 gap-y-2 mb-5">
      <Image
        src={defaultCourseImage}
        alt={title}
        objectFit="cover"
        width="800"
        height="800"
        className="rounded-t-lg hover:underline hover:cursor-pointer"
      />
      <div className="-mt-10 ml-3 shadow-xl w-fit rounded-full border border-gray-500/40 z-10">
        <Image
          src={authorImage !== "" ? authorImage : expertDefaultImage}
          alt={authorName}
          width="50"
          height="50"
          className="rounded-full "
        />
      </div>
      <div className="px-4 pb-2 gap-y-2 grid">
        <div>
          <h3 className="font-semibold text-base">
            <span
              className="hover:underline hover:cursor-pointer"
              onClick={() => {}}
            >
              {title}
            </span>
          </h3>
          <p className="text-xs line-clamp-2">
            by:{" "}
            <span
              className="hover:underline hover:cursor-pointer"
              onClick={() => {}}
            >
              {authorName}
            </span>
          </p>
        </div>
        <p className="text-sm line-clamp-2">{content}</p>
      </div>
      <div className="pb-4 px-4 flex justify-between">
        <Badge variant="outline">Price: {price}</Badge>
        <Button size="sm" onClick={() => chatWith(walletAddress)}>
          Contact
        </Button>
      </div>
    </div>
  )
}

export default Course
