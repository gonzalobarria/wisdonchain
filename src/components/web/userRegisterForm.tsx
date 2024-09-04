import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  ConsumerProps,
  UserRegisterFormProps,
} from "@/components/abis/types/generalTypes"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ReloadIcon } from "@radix-ui/react-icons"
import { ComboboxForm, InputForm } from "@/components/web/form/formComponents"
import {
  contentPreferences,
  genders,
  generalInterests,
  languages,
} from "@/data/data"
import { consumerNew } from "@/data/dummy"
import { UserRole } from "@/lib/constants"
import { FancyMultiSelect } from "./form/fancyMultiSelect"
import { convertToArray } from "@/lib/utils"

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

const UserRegisterForm = ({
  register,
  data,
}: UserRegisterFormProps<z.infer<typeof formSchema>, ConsumerProps>) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [dummyData, setDummyData] = useState<z.infer<typeof formSchema>>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    /* @ts-ignore */
    values: { ...dummyData },
  })

  useEffect(() => {
    loadDummyData(data ?? consumerNew)
    // setDummyData({
    //   nickname: "",
    //   mainGoal: "",
    //   gender: "",
    //   generalInterests: [],
    //   contentPreferences: [],
    //   spokenLanguages: [],
    // })
  }, [])

  const loadDummyData = (myData: ConsumerProps) => {
    const { personalInformation, preferences } = myData
    const { gender, nickname, spokenLanguages } = personalInformation
    const { mainGoal, generalInterests, contentPreferences } = preferences

    setDummyData({
      nickname: nickname ?? "",
      mainGoal,
      gender: gender ?? "",
      generalInterests: generalInterests
        ? convertToArray(generalInterests)
        : [],
      contentPreferences: contentPreferences
        ? convertToArray(contentPreferences)
        : [],
      spokenLanguages: spokenLanguages ? convertToArray(spokenLanguages) : [],
    })
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    await register(values, UserRole.User)

    setIsLoading(false)
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
      </form>
    </Form>
  )
}

export default UserRegisterForm
