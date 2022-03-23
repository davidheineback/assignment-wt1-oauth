import { cookieOptionsConfig } from "./get-cookie-config"
import getGitLabURI from "./get-gitlab-uri"
import { getOAuthTokens } from './get-oauth-tokens'
import { getGitLabUserFrom } from './get-gitlab-user'
import { getGitlabUserActivtiesFrom } from './get-user-activities'

export const OauthURI = getGitLabURI()
export const cookieOptions = cookieOptionsConfig
export const getOAuthTokensFrom = (code: string) => getOAuthTokens(code)
export const getUserData = (access_token: string, token_type:string) => getGitLabUserFrom(access_token, token_type)
export const getActivitiesFor = (userID: string, access_token: string, token_type:string) => getGitlabUserActivtiesFrom(userID, access_token, token_type)