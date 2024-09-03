import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ItemFormProps } from "@/components/abis/types/generalTypes"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ReloadIcon } from "@radix-ui/react-icons"
import { InputForm } from "@/components/web/form/formComponents"

import { UserRole } from "@/lib/constants"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Main Goal must be at least 2 characters.",
  }),
})

const SocialRegisterForm = ({
  save,
}: ItemFormProps<z.infer<typeof formSchema>>) => {
  const router = useRouter()
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

    await save(values, UserRole.User)

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4 py-3">
          <InputForm
            form={form}
            name="title"
            label="How do you want people to call you?"
            placeholder="Nickname"
          />
          <InputForm
            form={form}
            name="content"
            label="What is your main goal?"
            placeholder="What is your main goal?"
          />
        </div>
        <div className="flex justify-end w-full pt-2 gap-4">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault()
              router.push("/")
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Publish Social Post
          </Button>
        </div>
        <div>
          <span>dummy data</span>
          <div className="flex w-full justify-start gap-2">
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                // setDummyData(user1)
              }}
            >
              user 1
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default SocialRegisterForm
