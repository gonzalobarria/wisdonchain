import Image from "next/image"

import expertDefaultImage from "../../../../public/expertDefaultImage.jpg"
import {
  ChatBubbleIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons"
import { PostProps } from "@/components/abis/types/generalTypes"

const Post = ({
  title,
  authorName,
  authorImage,
  createdAt,
  content,
  postImage,
}: PostProps) => {
  return (
    <div className="bg-background rounded-lg shadow-lg pb-1">
      <div className="flex gap-x-2  items-center px-4 pt-3">
        <div className="shadow-xl w-fit rounded-full border border-gray-500/40 z-10">
          <Image
            src={authorImage !== "" ? authorImage : expertDefaultImage}
            alt={authorName}
            width="40"
            height="40"
            className="rounded-full "
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm">{authorName}</h3>
          <span className="text-xs">{createdAt}</span>
        </div>
      </div>
      <div className="px-8 py-4">
        <h2 className="font-semibold pb-2">{title}</h2>
        <p className=" font-extralight text-black/80 leading-tight">
          {content}
        </p>
      </div>
      <Image
        src={postImage}
        alt="Wisd"
        objectFit="cover"
        width="800"
        height="800"
        unoptimized
      />
      <div className="p-4 gap-4 flex justify-between text-sm">
        <div className="flex gap-1 items-center">
          <HeartFilledIcon width="16" height="16" color="red" />
          <span className="text-gray-600">51</span>
        </div>
        <span className="text-gray-600">10 Comentarios</span>
      </div>
      <div className="flex gap-8 justify-between px-4 py-2 border-t border-gray-300 mx-4">
        <div className="flex items-center gap-1 hover:underline hover:cursor-pointer">
          <HeartIcon width="16" height="16" />
          <span className="text-gray-600">Me gusta</span>
        </div>
        <div className="flex items-center gap-1 hover:underline hover:cursor-pointer">
          <ChatBubbleIcon width="16" height="16" />
          <span className="text-gray-600">Comentar</span>
        </div>
      </div>
    </div>
  )
}

export default Post
