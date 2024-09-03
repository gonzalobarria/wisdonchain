import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import Image from "next/image"

import expertDefaultImage from "../../../../public/expertDefaultImage.jpg"
import { Input } from "@/components/ui/input"

const BarAddPost = () => {
  const [isLoading, setIsLoading] = useState(false)
  const authorImage = ""
  const authorName = ""

  return (
    <div className="flex bg-background p-2 w-full rounded-lg  gap-x-2 items-center">
      <div className="shadow-xl w-fit rounded-full border border-gray-500/40 z-10">
        <Image
          src={authorImage !== "" ? authorName : expertDefaultImage}
          alt={authorName}
          width="40"
          className="rounded-full "
        />
      </div>
      <Input placeholder="What are you thinkng?" />
      <Button type="submit" disabled={isLoading}>
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        New Post
      </Button>
    </div>
  )
}

export default BarAddPost
