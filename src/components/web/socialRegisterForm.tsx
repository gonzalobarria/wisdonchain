import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ReloadIcon } from "@radix-ui/react-icons"
import { InputForm, TextareaForm } from "@/components/web/form/formComponents"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Main Goal must be at least 2 characters.",
  }),
})

type SocialRegisterForm = {
  addPost: (values: any) => Promise<void>
}

const SocialRegisterForm = ({ addPost }: SocialRegisterForm) => {
  const [isLoading, setIsLoading] = useState(false)
  const [dummyData, setDummyData] = useState<z.infer<typeof formSchema>>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    /* @ts-ignore */
    values: { ...dummyData },
  })

  useEffect(() => {
    setDummyData({
      title: "",
      content: "",
    })
  }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    await addPost(values)

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-2 py-3">
          <InputForm form={form} name="title" placeholder="Title of the post" />
          <TextareaForm
            form={form}
            name="content"
            placeholder="Content of the post"
          />
        </div>
        <div className="flex justify-end w-full pt-2 gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Add Post
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SocialRegisterForm
