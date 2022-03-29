import { UserData }from './user-data'
/**
 * Include own properties in iron-session module
 */
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