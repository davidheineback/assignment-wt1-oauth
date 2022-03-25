import { IronSessionOptions } from 'iron-session'

interface CookieOptions extends IronSessionOptions {
  cookieName: string,
  password: string,
  cookieOptions: {
    secure: boolean,
    httpOnly: boolean,
    maxAge: number
    sameSite: 'lax' | 'strict' | 'none'
}
}
export const cookieOptionsConfig: CookieOptions = {
  cookieName: process.env.COOKIE_NAME!,
  password: process.env.COOKIE_SECRET!,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // sets the secure param to true in production environment
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    sameSite: 'lax'
  }
}