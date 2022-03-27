import { UserData }from './user-data'

declare module "iron-session" {
  interface IronSessionData {
    tokens?: {
      access_token?: string
      refresh_token?: string
      expiration?: number
    }
    user?: UserData
    state?: string
    error?: {
        code: number
        message: string
    }

    }

  }