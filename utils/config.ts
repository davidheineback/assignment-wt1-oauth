import getGitLabURI from "./get-gitlab-uri"
import { getOAuthTokens, revokeGitLabAccess } from './get-oauth-tokens'
import { getGitLabUserFrom } from './get-gitlab-user'
import { getGitlabUserActivtiesFrom } from './get-user-activities'


// Module to configure generic methods to gitlab specific.

export const OAuthURI = (state: string) => getGitLabURI(state)
export const revokeAccess = (token: string) => revokeGitLabAccess(token)
export const getOAuthTokensFrom = (code: string, refresh_token: boolean) => getOAuthTokens({code, refresh_token})
export const getUserData = (access_token: string) => getGitLabUserFrom(access_token)
export const getActivitiesFor = (userID: string, access_token: string) => getGitlabUserActivtiesFrom(userID, access_token)
