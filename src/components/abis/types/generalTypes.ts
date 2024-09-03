export type TIMEZONE = "Europe/Madrid" | "Europe/Paris" | "Europe/Istanbul"

declare global {
  interface Window {
    ethereum: any
  }
  interface Window {
    FloatingInbox: any
  }
}

export type EncryptDataProps = { iv: string; encryptedData: string }

export type SelectType = {
  label: string
  value: string
}

export type RegisterFormProps<T> = {
  register: (values: T, userRole: number) => Promise<void>
}

export type ItemFormProps<T> = {
  save: (values: T, userRole: number) => Promise<void>
}

export type CourseProps = {
  id?: string
  title: string
  description: string
  tags: string[]
  level: string
  duration: string
  modulesOrLessons: string
  price: string
  supplementaryMaterial: string
  prerequisites: string
  certification: string
  language: string
}

export type BrandOrProjectProps = {
  id?: string
  brandOrProject: string
  contentDescription: string
  contentCategories: string[]
  contentPreferences: string[]
  contentLanguages: string[]
}

export type PersonalInformationProps = {
  id: string
  nickname?: string
  name: string
  email: string
  walletAddress: string
  role: string
  gender: string
  spokenLanguages: string[]
}

export type ExpertProps = {
  personalInformation: PersonalInformationProps
  brandsOrProjects: BrandOrProjectProps[]
  courses: CourseProps[]
}

export type ConsumerProps = {
  personalInformation: PersonalInformationProps
  preferences: {
    mainGoal: string
    generalInterests: string[]
    contentPreferences: string[]
  }
}
