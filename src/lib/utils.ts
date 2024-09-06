import { JsonRpcSigner } from "ethers"
import crypto from "crypto"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  ConsumerProps,
  EncryptDataProps,
  SelectType,
} from "@/components/abis/types/generalTypes"
import { algorithm, key, UserRole } from "./constants"
import { UserInfo } from "@web3auth/mpc-core-kit"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getBaseURL = (cid: string) =>
  `https://gateway.lighthouse.storage/ipfs/${cid}`

export const encryptData = (data: any): EncryptDataProps => {
  const iv = crypto.randomBytes(16)
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), iv)

  let encrypted = cipher.update(data)
  encrypted = Buffer.concat([encrypted, cipher.final()])

  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") }
}

export const decrypt = (data: EncryptDataProps): string => {
  let iv = Buffer.from(data.iv, "hex")
  let encryptedText = Buffer.from(data.encryptedData, "hex")
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "hex"), iv)
  let decrypted = decipher.update(encryptedText)

  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

export const listCID = async (cid: string) => {
  const jsonContent = await fetch(`${getBaseURL(cid)}`)
  return await jsonContent.json()
}

export const upload = async (data: any): Promise<string> => {
  const response = await fetch("/api/ipfs", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })

  const contentID = await response.json()
  if (contentID.cid === "") return ""

  return contentID.cid
}

const callGPT = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

export const askExpertMatches = (data: any): Promise<any> =>
  callGPT("/api/expertMatches", data)

export const askRecommendedCourses = (data: any): Promise<any> =>
  callGPT("/api/recommendedCourses", data)

export const viewIPFSContent = async (cid: string) => {
  const contenido = await fetch(`/api/ipfs?cid=${cid}`)
  const res = await contenido.json()
  return res.resource
}

export const getUserRole = (role: number): string => {
  const { Expert, User } = UserRole

  const userRole = {
    [Expert]: "Expert",
    [User]: "Consumer",
  }

  return userRole[role] ?? ""
}

export const convertToArray = (arr: string[]): SelectType[] =>
  arr.map((val) => ({
    value: val,
    label: val,
  }))

export const convertToStringArray = (arr: SelectType[]): string[] =>
  arr.map((val) => val.value)

export const getConsumer = (
  values: any,
  user: UserInfo,
  signer: JsonRpcSigner,
  userRole: number,
): ConsumerProps => ({
  personalInformation: {
    nickname: values.nickname,
    name: user.name,
    email: user.email,
    imgURL: user.profileImage,
    role: getUserRole(userRole),
    spokenLanguages: convertToStringArray(values.spokenLanguages),
    walletAddress: signer.address,
    gender: values.gender,
  },
  preferences: {
    mainGoal: values.mainGoal,
    generalInterests: convertToStringArray(values.generalInterests),
    contentPreferences: convertToStringArray(values.contentPreferences),
  },
})
