import type { NextApiRequest, NextApiResponse } from "next"
import {
  getExpertMatches,
  initialSetup,
} from "@/lib/serverFunctions/chat/functions"

type Data = {
  message?: string
  runId?: number
}

export const config = {
  maxDuration: 60,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const { email, context } = req.body
    console.log({ email, context })

    const setup = await initialSetup(email)
    if (!setup) {
      console.log("er :>> ")
      return
    }

    return res
      .status(200)
      .json({ message: "runId created", runId: setup.runId })
  } else {
    return res.status(403).json({ message: "Method not allowed" })
  }
}
