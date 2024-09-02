import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { RegisterFormProps } from "@/components/abis/types/generalTypes"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ReloadIcon } from "@radix-ui/react-icons"
import { InputForm } from "@/components/web/form/formComponents"
import { contentCategories, contentPreferences, languages } from "@/data/data"
import { expert1 } from "@/data/dummy"
import { UserRole } from "@/lib/constants"
import { FancyMultiSelect } from "./form/fancyMultiSelect"

const formSchema = z.object({
  whatICreate: z.array(
    z.object({
      brandOrProject: z.string().min(2, {
        message: "Name must be at least 2 characters.",
      }),
      contentDescription: z.string().min(2, {
        message: "Name must be at least 2 characters.",
      }),
      contentCategories: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .min(1, {
          message: "Select at least 1 preference",
        }),
      contentPreferences: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .min(1, {
          message: "Select at least 1 preference",
        }),
      contentLanguages: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .min(1, {
          message: "Select at least 1 language",
        }),
    }),
  ),
  // extraInformation: z.array(
  //   z.object({
  //     socialNetworks: z
  //       .array(z.object({ label: z.string(), value: z.string() }))
  //       .min(1, {
  //         message: "Select at least 1 preference",
  //       }),
  //     link: z.string().min(2, {
  //       message: "Link must be at least 2 characters.",
  //     }),
  //     experiencesAndAchievements: z.string().min(2, {
  //       message: "Name must be at least 2 characters.",
  //     }),
  //     targetAudience: z.string().min(2, {
  //       message: "Name must be at least 2 characters.",
  //     }),
  //     colaborateWithOther: z.boolean().default(false).optional(),
  //   })
  // ),
})

const ExpertRegisterForm = ({
  register,
}: RegisterFormProps<z.infer<typeof formSchema>>) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [dummyData, setDummyData] = useState<z.infer<typeof formSchema>>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    /* @ts-ignore */
    values: { ...dummyData },
  })

  const { fields, append, remove } = useFieldArray({
    name: "whatICreate",
    control: form.control,
  })

  useEffect(() => {
    setDummyData({
      whatICreate: [
        {
          brandOrProject: "",
          contentDescription: "",
          contentCategories: [],
          contentPreferences: [],
          contentLanguages: [],
        },
      ],
    })
  }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    await register(values, UserRole.Expert)

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 py-3">
          {/** whatICreate */}
          <div className="grid border border-gray-500/40 p-4 rounded-md gap-2">
            <h2 className="flex justify-center text-lg font-semibold">
              What I Create
            </h2>
            {fields.map((field, index) => (
              <div key={field.id}>
                <h3 className="text-base font-semibold border-b-2 pb-1">
                  Brand or Project {index + 1}
                </h3>
                <div className="grid grid-cols-6 gap-4 py-3">
                  <div className="col-span-3">
                    <InputForm
                      form={form}
                      name={`whatICreate.${index}.brandOrProject`}
                      label="Brand or Project Name"
                      placeholder="What is the name of your brand or project?"
                    />
                  </div>
                  <div className="col-span-3">
                    <InputForm
                      form={form}
                      name={`whatICreate.${index}.contentDescription`}
                      label="Content Description"
                      placeholder="Explain me the content"
                    />
                  </div>
                  <div className="col-span-2">
                    <FancyMultiSelect
                      items={contentPreferences}
                      name={`whatICreate.${index}.contentPreferences`}
                      label="Select Content Preference"
                      placeholder="Select Content Preference"
                      form={form}
                    />
                  </div>
                  <div className="col-span-2">
                    <FancyMultiSelect
                      items={contentCategories}
                      name={`whatICreate.${index}.contentCategories`}
                      label="Select Content Categories"
                      placeholder="Select Content Categories"
                      form={form}
                    />
                  </div>
                  <div className="col-span-2">
                    <FancyMultiSelect
                      items={languages}
                      name={`whatICreate.${index}.contentLanguages`}
                      label="Select at least one language"
                      placeholder="Select a Language"
                      form={form}
                    />
                  </div>

                  <div className="flex justify-end items-end col-span-2">
                    {index > 0 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => remove(index)}
                      >
                        Delete Brand or Project {index + 1}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault()

                  append({
                    brandOrProject: "",
                    contentDescription: "",
                    contentCategories: [],
                    contentPreferences: [],
                    contentLanguages: [],
                  })
                }}
              >
                Other Brand or Project?
              </Button>
            </div>
          </div>
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
                setDummyData(expert1)
              }}
            >
              expert 1
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ExpertRegisterForm
