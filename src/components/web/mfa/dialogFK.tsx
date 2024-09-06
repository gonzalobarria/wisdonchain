import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/components/web3/context/appContext"
import MFAForm from "./mfaForm"

export function DialogFK() {
  const { logout, accessWithFactorKey } = useAppContext()
  const [open, setOpen] = useState(true)

  const validateMFA = async (values: any) => {
    await accessWithFactorKey(values.factorKey)
    setOpen(false)
  }

  const cancel = () => {
    logout()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} defaultOpen>
      <DialogTrigger asChild aria-disabled="true">
        <Button variant="link">Need to validate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Multi-Factor Authentication Enabled</DialogTitle>
          <DialogDescription>
            You must use your Factor Key to login
          </DialogDescription>
        </DialogHeader>
        <MFAForm action={validateMFA} cancel={cancel} />
      </DialogContent>
    </Dialog>
  )
}
