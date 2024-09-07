import type { NextApiRequest, NextApiResponse } from "next"
import {
  getAnwswerRecommendedCourses,
  getExpertMatches,
  getQuestionRecommendedCourses,
  initialSetup,
} from "@/lib/serverFunctions/chat/functions"

type Data = {
  walletAddress?: string
  isFunded?: boolean
  message?: string
  output?: any
}

export const config = {
  maxDuration: 60,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const { runId, question } = req.body
    console.log({ runId, question })

    let output = await getAnwswerRecommendedCourses(runId, question)

    return res.status(200).json({ message: "ss", output })
  } else {
    return res.status(403).json({ message: "Method not allowed" })
  }
}
