import getGitLabURI from "./get-gitlab-uri"
import { getOAuthTokens } from './get-oauth-tokens'
import { getGitLabUserFrom } from './get-gitlab-user'
import { getGitlabUserActivtiesFrom } from './get-user-activities'

export const OAuthURI = (state: string) => getGitLabURI(state)
export const getOAuthTokensFrom = (code: string) => getOAuthTokens(code)
export const getUserData = (access_token: string) => getGitLabUserFrom(access_token)
export const getActivitiesFor = (userID: string, access_token: string) => getGitlabUserActivtiesFrom(userID, access_token)
