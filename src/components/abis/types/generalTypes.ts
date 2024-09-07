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

export type UserRegisterFormProps<T, Y> = {
  data?: Y
} & RegisterFormProps<T>

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
  nickname?: string
  name: string
  email: string
  walletAddress: string
  imgURL?: string
  role: string
  gender?: string
  spokenLanguages: string[]
}

export type PreferencesConsumerProps = {
  mainGoal: string
  generalInterests: string[]
  contentPreferences: string[]
}

export type ExpertProps = {
  id?: string
  personalInformation: PersonalInformationProps
  brandsOrProjects: BrandOrProjectProps[]
  courses?: CourseProps[]
}

export type ConsumerProps = {
  id?: string
  personalInformation: PersonalInformationProps
  preferences: PreferencesConsumerProps
  experts?: {
    follow: number[]
    recommended: number[]
  }
}

export type UserMatchProps = {
  id: string | number
  name: string
  shortDescription: string
}

export type CourseRecommended = {
  author: { name: string; photoURL: string; walletAddress: string }
  course: {
    id: string
    title: string
    content: string
    price: string
    imgURL: string
  }
}

export type ExpertRecommended = {
  id: string
  name: string
  shortDescription: string
}
