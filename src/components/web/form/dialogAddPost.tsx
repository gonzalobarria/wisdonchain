import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SocialRegisterForm from "@/components/web/socialRegisterForm"
import BarAddPost from "../social/barAddPost"
import { useState } from "react"

export function DialogAddPost() {
  const [open, setOpen] = useState(false)

  const addPost = async (values: any) => {
    console.log("values :>> ", values)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-0 h-full">
          <BarAddPost />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>Tell what ever you want</DialogDescription>
        </DialogHeader>
        <SocialRegisterForm addPost={addPost} />
      </DialogContent>
    </Dialog>
  )
}
