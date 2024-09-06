import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ReloadIcon } from "@radix-ui/react-icons"
import { InputForm } from "@/components/web/form/formComponents"

const formSchema = z.object({
  factorKey: z.string().min(5, {
    message: "Factor Key too short",
  }),
})

type MFAFormProps = {
  action: (values: z.infer<typeof formSchema>) => Promise<void>
  cancel: () => void
}

const MFAForm = ({ action, cancel }: MFAFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      factorKey: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    await action(values)

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 py-3">
          <InputForm
            form={form}
            name="factorKey"
            label="Factor Key"
            placeholder="123SDAsd35rg#$"
          />
        </div>
        <div className="flex justify-end w-full pt-2 gap-4">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault()
              cancel()
            }}
          >
            Logout
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default MFAForm
