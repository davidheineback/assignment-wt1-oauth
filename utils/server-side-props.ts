import { getOAuthTokensFrom } from "./config"
import crypto from 'crypto'

export async function setSessionToken(code: string) {
  const tokens = await getOAuthTokensFrom(code)

  const { access_token, refresh_token, expires_in, created_at } = tokens
  const expiration = expires_in + created_at

  return {
    access_token,
    refresh_token,
    expiration
  }
}

export function invalidToken(expiration: number) {
  return (expiration - Math.ceil(Date.now() / 1000) < 0)
}


export function generateState(): string {
  return crypto.randomBytes(20).toString('hex')
}