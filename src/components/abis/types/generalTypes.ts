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
