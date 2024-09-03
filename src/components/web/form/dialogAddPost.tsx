import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AddPostForm from "../social/addPost"
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
        <AddPostForm addPost={addPost} />
      </DialogContent>
    </Dialog>
  )
}
