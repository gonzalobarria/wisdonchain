import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useWisdContext } from "@/components/web3/context/wisdContext"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ReloadIcon } from "@radix-ui/react-icons"
import { getUserRole, upload } from "@/lib/utils"
import { ComboboxForm, InputForm } from "@/components/web/form/formComponents"
import {
  contentPreferences,
  genders,
  generalInterests,
  languages,
} from "@/data/data"
import { UserRole } from "@/lib/constants"
import { FancyMultiSelect } from "./form/fancyMultiSelect"
import { user1 } from "../../data/dummy"

const formSchema = z.object({
  nickname: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  mainGoal: z.string().min(2, {
    message: "Main Goal must be at least 2 characters.",
  }),
  gender: z.string().min(2, {
    message: "Main Goal must be at least 2 characters.",
  }),
  generalInterests: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, {
      message: "Select at least 1 interest",
    }),
  contentPreferences: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, {
      message: "Select at least 1 preference",
    }),
  spokenLanguages: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, {
      message: "Select at least 1 language",
    }),
})

const UserRegisterForm = () => {
  const router = useRouter()
  const { addUser } = useWisdContext()
  const [isLoading, setIsLoading] = useState(false)
  const [dummyData, setDummyData] = useState<z.infer<typeof formSchema>>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    /* @ts-ignore */
    values: { ...dummyData },
  })

  useEffect(() => {
    setDummyData({
      nickname: "",
      mainGoal: "",
      gender: "",
      generalInterests: [],
      contentPreferences: [],
      spokenLanguages: [],
    })
  }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    const userRole = UserRole.User
    const data = { ...values, userRole: getUserRole(userRole) }
    const cid = await upload(JSON.stringify(data))

    await addUser(cid, userRole)

    setIsLoading(false)
    // router.push("/app")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4 py-3">
          <InputForm
            form={form}
            name="nickname"
            label="How do you want people to call you?"
            placeholder="Nickname"
          />
          <InputForm
            form={form}
            name="mainGoal"
            label="What is your main goal?"
            placeholder="What is your main goal?"
          />
          <ComboboxForm
            name="gender"
            label="Select a Gender"
            placeholder="Select a Gender"
            emptyLabel="Genders not found"
            items={genders}
            form={form}
            isOptional
          />
          <FancyMultiSelect
            items={languages}
            name="spokenLanguages"
            label="Select at least one language"
            placeholder="Select a Language"
            form={form}
          />
          <FancyMultiSelect
            items={contentPreferences}
            name="contentPreferences"
            label="Select at least one preference"
            placeholder="Select a Prefence"
            form={form}
          />
          <FancyMultiSelect
            items={generalInterests}
            name="generalInterests"
            label="Select at least one interest"
            placeholder="Select a Interest"
            form={form}
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
            Save Profile
          </Button>
        </div>
        <div>
          <span>dummy data</span>
          <div className="flex w-full justify-start gap-2">
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                setDummyData(user1)
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

export default UserRegisterForm
