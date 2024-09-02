import type { NextApiRequest, NextApiResponse } from "next"
import { fundWallet } from "@/lib/serverFunctions/fundNewUser"

type Data = {
  walletAddress?: string
  isFunded?: boolean
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    let funded = false
    const { walletAddress } = req.body
    try {
      await fundWallet(walletAddress)
      funded = true
    } catch (error) {
      console.log('error :>> ', error);
    }

    return res.status(200).json({ isFunded: funded, walletAddress })
  } else {
    return res.status(403).json({ message: "Method not allowed" })
  }
}
