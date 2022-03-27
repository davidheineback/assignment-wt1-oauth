import { UserData }from './user-data'

declare module "iron-session" {
  interface IronSessionData {
    tokens?: {
      access_token?: string,
      refresh_token?: string,
      expiration?: number,
    }
    user?: UserData

    }

  }