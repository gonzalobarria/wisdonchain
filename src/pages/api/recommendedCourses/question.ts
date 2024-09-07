import type { NextApiRequest, NextApiResponse } from "next"
import { getQuestionRecommendedCourses } from "@/lib/serverFunctions/chat/functions"

type Data = {
  message?: string
  question?: any
}

export const config = {
  maxDuration: 60,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const { runId } = req.body
    console.log({ runId })

    let question = await getQuestionRecommendedCourses(runId)

    return res.status(200).json({ message: "ss", question })
  } else {
    return res.status(403).json({ message: "Method not allowed" })
  }
}
