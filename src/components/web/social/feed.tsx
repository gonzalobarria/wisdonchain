import {
  askAnswerRecommendedCourses,
  askInitialSetup,
  askQuestionRecommendedCourses,
  cn,
} from "@/lib/utils"

type FeedProps = {
  className?: string
}

import Course from "./course"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import { useAppContext } from "@/components/web3/context/appContext"
import { Button } from "@/components/ui/button"
import LoadingStep from "../animation/loadingStep"
import { CourseRecommended } from "@/components/abis/types/generalTypes"

const Feed = ({ className }: FeedProps) => {
  const [coursesRecommended, setCoursesRecommended] = useState<
    CourseRecommended[] | undefined
  >()
  const [isLoading, setIsLoading] = useState(false)
  const [step1, setStep1] = useState(0)
  const [step2, setStep2] = useState(0)
  const [step3, setStep3] = useState(0)

  const { user } = useAppContext()

  const getRecommendedCourses = async () => {
    if (!user) return

    setIsLoading(true)
    setStep1(1)

    const { runId } = await askInitialSetup({
      context: "recommendedCourses",
      email: user.email,
    })
    setStep1(2)

    setStep2(1)
    const { question } = await askQuestionRecommendedCourses({ runId })
    setStep2(2)
    setStep3(1)
    const courses = await askAnswerRecommendedCourses({ runId, question })
    setStep3(2)

    setCoursesRecommended(courses.output)

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
        "flex h-[600px] flex-col p-4 md:p-8 max-w-4xls bg-background shadow-lg rounded-lg gap-y-3 md:sticky md:top-24 ",
        className,
      )}
    >
      <h2 className="font-semibold text-xl">Courses for You</h2>

      {step1 === 0 && !coursesRecommended && (
        <div className="flex items-center h-full">
          <div className="flex justify-center w-full">
            <Button onClick={getRecommendedCourses}> Call AI</Button>
          </div>
        </div>
      )}
      {isLoading && (
        <>
          <div className="flex items-center h-full">
            <div className="flex flex-col items-start pl-20 w-full gap-y-3">
              <LoadingStep title="Knowing my self" step={step1} />
              <LoadingStep title="Knowing the question" step={step2} />
              <LoadingStep title="Getting the answer" step={step3} />
            </div>
          </div>
        </>
      )}

      {coursesRecommended && !isLoading && (
        <ScrollArea>
          {coursesRecommended.map(
            ({
              author: { name, photoURL, walletAddress },
              course: { id, title, content, price, imgURL },
            }) => (
              <Course
                key={id}
                title={title}
                content={content}
                price={price}
                courseImage={imgURL}
                authorName={name}
                authorImage={photoURL}
                walletAddress={walletAddress}
              />
            ),
          )}
        </ScrollArea>
      )}
    </div>
  )
}

export default Feed
