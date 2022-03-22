import { cookieOptionsConfig } from "./getCookieConfig"
import getGitLabURI from "./getGitLabURI"
import { getOAuthTokens } from './getOauthTokens'

export const OauthURI = getGitLabURI()
export const cookieOptions = cookieOptionsConfig
export const getOAuthTokensFrom = (code: string) => getOAuthTokens(code)