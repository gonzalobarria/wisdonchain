import Image from "next/image"
import { Inter } from "next/font/google"
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const upload = async () => {
    const response = await fetch("/api/updateKB", {
      method: "post",
    })

    const contentID = await response.json()
    console.log("Resultado final")
    console.log(contentID)
  }

  return (
    <div>
      <Button onClick={upload}>upload</Button>
    </div>
  )
}
