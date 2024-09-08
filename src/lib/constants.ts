import { hardhat, morphHolesky } from "wagmi/chains"

export const CONTRACT_ADDRESSES: { [chainId: number]: string } = {
  [hardhat.id]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  [morphHolesky.id]: "0xe368F5948c7aFaD6fB1A92b08D230D772186F32D",
}

export const key = process.env.ENCRIPTION_KEY || ""
export const algorithm = "aes-256-cbc"
export const verifier = process.env.NEXT_PUBLIC_VERIFIER ?? ""

export const UserRole = {
  Expert: 0,
  Consumer: 1,
}

export const initialFund = "0.06"
