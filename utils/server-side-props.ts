import { getOAuthTokensFrom, OAuthURI } from './config'
import crypto from 'crypto'
import { cookieOptionsConfig } from './get-cookie-config'
import { withIronSessionSsr } from 'iron-session/next'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { IronSession } from 'iron-session'

// From iron-session documentation https://github.com/vvo/iron-session
export function withSessionSsr<
P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, cookieOptionsConfig)
}


export async function setSessionToken(code: string, refreshToken: boolean) {
  const tokens = await getOAuthTokensFrom(code, refreshToken)

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

export async function redirectWithNewStateFrom(session: IronSession) {
  session.state = generateState()
  await session.save()
  return {
    redirect: {
      destination: OAuthURI(session.state),
      permanent: false,
    }
  }
}
