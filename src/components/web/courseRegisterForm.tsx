import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ItemFormProps } from "@/components/abis/types/generalTypes"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ReloadIcon } from "@radix-ui/react-icons"
import {
  ComboboxForm,
  InputForm,
  InputTagsForm,
  TextareaForm,
} from "@/components/web/form/formComponents"
import { languages } from "@/data/data"
import { UserRole } from "@/lib/constants"
import { couser1ExpertGB } from "@/data/dummy"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  tags: z
    .array(
      z.string().min(2, {
        message: "Tags must be at least 2 characters.",
      }),
    )
    .min(1, {
      message: "Select at least one tag",
    }),
  level: z.string().min(2, {
    message: "Level must be at least 2 characters.",
  }),
  duration: z.string().min(2, {
    message: "Duration must be at least 2 characters.",
  }),
  modulesOrLessons: z.string().min(2, {
    message: "Modules or Lessons must be at least 2 characters.",
  }),
  price: z.string().min(2, {
    message: "Price must be at least 2 characters.",
  }),
  supplementaryMaterial: z.string().min(2, {
    message: "Supplementary Material must be at least 2 characters.",
  }),
  prerequisites: z.string().min(2, {
    message: "Prerequisites must be at least 2 characters.",
  }),
  certification: z.string().min(2, {
    message: "Certification must be at least 2 characters.",
  }),
  language: z.string().min(2, {
    message: "Language must be at least 2 characters.",
  }),
})

const CouseRegisterForm = ({
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
      description: "",
      tags: [],
      level: "",
      duration: "",
      modulesOrLessons: "",
      price: "",
      supplementaryMaterial: "",
      prerequisites: "",
      certification: "",
      language: "",
    })
  }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    await save(values, UserRole.Consumer)

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4 py-3">
          <InputForm
            form={form}
            name="title"
            label="Title of the Course"
            placeholder="Title of the Course"
          />
          <TextareaForm
            form={form}
            name="description"
            label="A brief description"
            placeholder="A brief description"
          />
          <InputTagsForm
            form={form}
            name="tags"
            label="Tags"
            placeholder="What tags identify your course?"
          />
          <InputForm
            form={form}
            name="level"
            label="Level of the Course"
            placeholder="Beginner - Advanced"
          />
          <InputForm
            form={form}
            name="duration"
            label="Duration of the Course"
            placeholder="What is the duration of the course (in weeks/hours)?"
          />
          <InputForm
            form={form}
            name="modulesOrLessons"
            label="Modules or Lessons"
            placeholder="How much modules or lessons?"
          />
          <InputForm
            form={form}
            name="price"
            label="Price of the Course"
            placeholder="$50 - $240"
          />
          <InputForm
            form={form}
            name="supplementaryMaterial"
            label="Supplementary Material"
            placeholder="What kind of supplementary material are you going to give?"
          />
          <InputForm
            form={form}
            name="prerequisites"
            label="Prerequisites"
            placeholder="What is required to take this course?"
          />
          <InputForm
            form={form}
            name="certification"
            label="Certification"
            placeholder="Is any certification provided?"
          />
          <ComboboxForm
            name="language"
            label="Select the Language of the Course"
            placeholder="Select a Language"
            emptyLabel="Language not found"
            items={languages}
            form={form}
            isOptional
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
            Save Course
          </Button>
        </div>
        <div>
          <span>dummy data</span>
          <div className="flex w-full justify-start gap-2">
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                setDummyData(couser1ExpertGB)
              }}
            >
              course 1
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CouseRegisterForm
