import { useEffect, useState } from "react"

import { useWisdContext } from "@/components/web3/context/wisdContext"
import {
  askAnswerExpertMatches,
  askInitialSetup,
  askQuestionExpertMatches,
  cn,
} from "@/lib/utils"
import UserMatches from "./userMatches"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppContext } from "@/components/web3/context/appContext"
import { UserMatchProps } from "@/components/abis/types/generalTypes"
import { Button } from "@/components/ui/button"

type RightProps = {
  className?: string
}

const Right = ({ className }: RightProps) => {
  const { signer } = useAppContext()
  const [expertRecommended, setExpertRecommended] = useState<UserMatchProps[]>(
    [],
  )
  const { user } = useAppContext()

  const expMatches = async () => {
    if (!user || !signer) return

    const { runId } = await askInitialSetup({
      context: "expertMatches",
      email: user.email,
    })

    const { question } = await askQuestionExpertMatches({ runId })
    const matches = await askAnswerExpertMatches({ runId, question })

    setExpertRecommended(matches.output)
  }

  return (
    <div
      className={cn(
        "flex h-[600px] flex-col p-4 md:p-8 max-w-4xls bg-background shadow-lg rounded-lg gap-y-5 md:sticky md:top-24",
        className,
      )}
    >
      <h2 className="font-semibold text-xl">My Wisd-AI Matches</h2>
      <Button onClick={expMatches}> Call AI</Button>
      <ScrollArea>
        <UserMatches users={expertRecommended} />
      </ScrollArea>
    </div>
  )
}

export default Right
