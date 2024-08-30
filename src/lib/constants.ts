import { hardhat, morphHolesky } from "wagmi/chains"

export const CONTRACT_ADDRESSES: { [chainId: number]: string } = {
  [hardhat.id]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  [morphHolesky.id]: "0xf7E0900FA9bA0768686ed6e24c2e4D8a3473C7D7",
}

export const key = process.env.ENCRIPTION_KEY || ""
export const algorithm = "aes-256-cbc"
export const verifier = process.env.NEXT_PUBLIC_VERIFIER ?? ""

export const UserRole = {
  Expert: 0,
  User: 1,
}
