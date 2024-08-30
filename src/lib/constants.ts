import { hardhat, morphHolesky } from "wagmi/chains"

export const CONTRACT_ADDRESSES: { [chainId: number]: string } = {
  [hardhat.id]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  [morphHolesky.id]: "0x2c1279586FA10bB4C2ec19B15Da48e757aDb674a",
}

export const key = process.env.ENCRIPTION_KEY || ""
export const algorithm = "aes-256-cbc"
export const verifier = process.env.NEXT_PUBLIC_VERIFIER ?? ""
