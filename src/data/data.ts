import { SelectType } from "@/components/abis/types/generalTypes"

export const languages: SelectType[] = [
  {
    value: "french",
    label: "French",
  },
  {
    value: "english",
    label: "English",
  },
  {
    value: "spanish",
    label: "Spanish",
  },
  {
    value: "chinese",
    label: "Chinese",
  },
]

export const contentPreferences: SelectType[] = [
  {
    value: "videos",
    label: "Videos",
  },
  {
    value: "blogs",
    label: "Blogs",
  },
  {
    value: "podcasts",
    label: "Podcasts",
  },
]

export const generalInterests: SelectType[] = [
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "art",
    label: "Art",
  },
  {
    value: "health",
    label: "Health",
  },
]

export const genders: SelectType[] = [
  {
    value: "female",
    label: "Female",
  },
  {
    value: "male",
    label: "Male",
  },
  {
    value: "non-binary",
    label: "Non Binary",
  },
]
