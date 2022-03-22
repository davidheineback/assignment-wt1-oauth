import getGitLabURI from "./getGitLabURI"

export const cookieOptions = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    sameSite: 'lax'
  }
}

export const OauthURI = getGitLabURI()