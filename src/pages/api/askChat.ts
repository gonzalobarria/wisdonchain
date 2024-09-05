import type { NextApiRequest, NextApiResponse } from "next"
import { getRecommendedCourses } from "@/lib/serverFunctions/chat/functions"

type Data = {
  walletAddress?: string
  isFunded?: boolean
  message?: string
  output?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const { runId, walletAddress, context } = req.body
    console.log({ runId, walletAddress, context })

    let output
    switch (context) {
      case "recommendedCourses":
        output = await getRecommendedCourses(49, walletAddress)
        break

      default:
        break
    }

    return res.status(200).json({ message: "ss", output })
  } else {
    return res.status(403).json({ message: "Method not allowed" })
  }
}
