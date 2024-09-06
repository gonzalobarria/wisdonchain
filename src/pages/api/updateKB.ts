import type { NextApiRequest, NextApiResponse } from "next"
import { updateKnowledgeBase } from "@/lib/serverFunctions/updateKnowledgeBase"

type Data = {
  message: string
  knowledgeBaseCID?: string
  indexCID?: string
}

export const UserRole = {
  Expert: 0,
  User: 1,
}

export const config = {
  maxDuration: 60,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" })

  const response = await updateKnowledgeBase()

  if (response?.isProcessed && response?.indexCID) {
    return res.status(200).json({
      knowledgeBaseCID: response.cid,
      indexCID: response.indexCID,
      message: `Knowledge base indexed`,
    })
  } else {
    const errMsg = response?.error || "Failed to index knowledge base."
    return res.status(500).json({ message: errMsg })
  }
}
