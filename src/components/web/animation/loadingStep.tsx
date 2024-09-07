import dynamic from "next/dynamic"

const Lottie = dynamic(() => import("react-lottie"), { ssr: false })
import * as animationData from "./pinjump.json"
import * as loading from "./loading.json"
import { Clock } from "lucide-react"

type LoadingStepProps = {
  title: string
  step: number
}

const LoadingStep = ({ title, step = 0 }: LoadingStepProps) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  const defaultOptionsLoading = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <div className="flex items-center space-x-2 justify-center">
      <div className="w-[25px] flex justify-center">
        {step === 0 && <Clock width={15} height={15} />}
        {step === 1 && (
          <Lottie options={defaultOptionsLoading} height={30} width={30} />
        )}
        {step === 2 && (
          <Lottie options={defaultOptions} height={30} width={30} />
        )}
      </div>
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
  )
}

export default LoadingStep
