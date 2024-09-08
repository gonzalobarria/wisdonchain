import { cn, getUserRole } from "@/lib/utils"
import Post from "./post"
import { DialogAddPost } from "../form/dialogAddPost"
import { postsExpert, postsConsumer } from "@/data/demoData/posts"
import { useWisdContext } from "@/components/web3/context/wisdContext"
import { UserRole } from "@/lib/constants"

type CenterProps = {
  className?: string
}

const Center = ({ className }: CenterProps) => {
  const { myData } = useWisdContext()

  let isConsumer =
    myData.personalInformation.role === getUserRole(UserRole.Consumer)

  let posts = isConsumer ? postsConsumer : postsExpert

  return (
    <div className={cn("flex flex-col max-w-4xl gap-y-5 ", className)}>
      <DialogAddPost />
      {posts.map(
        (
          { id, title, authorImage, authorName, content, createdAt, postImage },
          idx,
        ) => (
          <Post
            key={idx}
            id={id}
            title={title}
            authorName={authorName}
            authorImage={authorImage}
            createdAt={createdAt}
            content={content}
            postImage={postImage}
          />
        ),
      )}
    </div>
  )
}

export default Center
