import { useState } from "react"

import {
  askAnswerExpertMatches,
  askInitialSetup,
  askQuestionExpertMatches,
  cn,
} from "@/lib/utils"
import UserMatches from "./userMatches"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppContext } from "@/components/web3/context/appContext"
import { ExpertRecommended } from "@/components/abis/types/generalTypes"
import { Button } from "@/components/ui/button"
import LoadingStep from "../animation/loadingStep"

type RightProps = {
  className?: string
}

const Right = ({ className }: RightProps) => {
  const { signer } = useAppContext()
  const [expertRecommended, setExpertRecommended] = useState<
    ExpertRecommended[] | undefined
  >()
  const { user } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [step1, setStep1] = useState(0)
  const [step2, setStep2] = useState(0)
  const [step3, setStep3] = useState(0)

  const expMatches = async () => {
    if (!user || !signer) return

    setIsLoading(true)
    setStep1(1)
    const { runId } = await askInitialSetup({
      context: "expertMatches",
      email: user.email,
    })
    setStep1(2)

    setStep2(1)
    const { question } = await askQuestionExpertMatches({ runId })
    setStep2(2)

    setStep3(1)
    const matches = await askAnswerExpertMatches({ runId, question })
    setStep3(2)

    setExpertRecommended(matches.output)

    setTimeout(() => {
      setIsLoading(false)
      setStep1(0)
      setStep2(0)
      setStep3(0)
    }, 2000)
  }

  return (
    <div
      className={cn(
        "flex h-[600px] flex-col p-4 md:p-8 max-w-4xls bg-background shadow-lg rounded-lg gap-y-5 md:sticky md:top-24",
        className,
      )}
    >
      <h2 className="font-semibold text-xl">My Wisd-AI Matches</h2>
      {step1 === 0 && !expertRecommended && (
        <div className="flex items-center h-full">
          <div className="flex justify-center w-full">
            <Button onClick={expMatches}> Call AI</Button>
          </div>
        </div>
      )}

      {isLoading && (
        <>
          <div className="flex items-center h-full">
            <div className="flex flex-col items-start pl-20 w-full gap-y-4">
              <LoadingStep title="Knowing my self" step={step1} />
              <LoadingStep title="Knowing the question" step={step2} />
              <LoadingStep title="Getting the answer" step={step3} />
            </div>
          </div>
        </>
      )}
      {expertRecommended && !isLoading && (
        <ScrollArea>
          <UserMatches users={expertRecommended} />
        </ScrollArea>
      )}
    </div>
  )
}

export default Right
