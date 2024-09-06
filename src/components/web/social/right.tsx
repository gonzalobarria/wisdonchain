import { useEffect, useState } from "react"

import { useWisdContext } from "@/components/web3/context/wisdContext"
import { askExpertMatches, cn } from "@/lib/utils"
import UserMatches from "./userMatches"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppContext } from "@/components/web3/context/appContext"
import { Button } from "@/components/ui/button"

type RightProps = {
  className?: string
}

const Right = ({ className }: RightProps) => {
  const { setUserChatAddress } = useWisdContext()
  const [expertRecommended, setExpertRecommended] = useState([])
  const { user } = useAppContext()

  const chatWith = (address: string) => {
    setUserChatAddress(address)
    window.FloatingInbox.open()
  }

  const clean = () => {
    setUserChatAddress(undefined)
  }

  useEffect(() => {
    const expMatches = async () => {
      if (!user) return

      const res = await askExpertMatches({
        context: "expertMatches",
        email: user.email,
      })

      setExpertRecommended(res.output)
    }

    setTimeout(() => {
      expMatches()
    }, 3000)
  }, [user])

  return (
    <div
      className={cn(
        "flex h-[600px] flex-col p-4 md:p-8 max-w-4xls bg-background shadow-lg rounded-lg gap-y-5 md:sticky md:top-24",
        className,
      )}
    >
      <h2 className="font-semibold text-xl">My Wisd-AI Matches</h2>
      <ScrollArea>
        <UserMatches users={expertRecommended} />
      </ScrollArea>

      <Button
        onClick={() => chatWith("0xf2570cAE93Bb8DFB62dA9f0bd4da491A66eC2e9C")}
      >
        chat
      </Button>
      <Button onClick={clean}>clean</Button>
    </div>
  )
}

export default Right
