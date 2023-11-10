export interface User {
  id?: string
  fullName: string
}

export type AuthState = {
  token: string | null
}

export interface SigninInput {
  cc: number
  password: string
}