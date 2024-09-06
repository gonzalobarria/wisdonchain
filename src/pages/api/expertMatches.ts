import type { NextApiRequest, NextApiResponse } from "next"
import {
  getExpertMatches,
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
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const { email, context } = req.body
    console.log({ email, context })

    let output
    const setup = await initialSetup(email)
    if (!setup) {
      console.log("er :>> ")
      return
    }

    output = await getExpertMatches(setup.runId, setup.contract)

    return res.status(200).json({ message: "ss", output })
  } else {
    return res.status(403).json({ message: "Method not allowed" })
  }
}
