import getGitLabURI from "./get-gitlab-uri"
import { getOAuthTokens, revokeGitLabAccess } from './get-oauth-tokens'
import { getGitLabUserFrom } from './get-gitlab-user'
import { getGitlabUserActivtiesFrom } from './get-user-activities'


// Module to configure generic methods to gitlab specific.

// Takes a state parameter and creates a gitlab oauth/authorize token with state and ask for code response.
export const OAuthURI = (state: string) => getGitLabURI(state)

// Method to revoke access token.
export const revokeAccess = (token: string) => revokeGitLabAccess(token)

//  Method to get tokens.
export const getOAuthTokensFrom = (code: string, refresh_token: boolean) => getOAuthTokens({code, refresh_token})

// Get user data.
export const getUserData = (access_token: string) => getGitLabUserFrom(access_token)

// Method to get authenticated users 101 latest activities.
export const getActivitiesFor = (userID: string, access_token: string) => getGitlabUserActivtiesFrom(userID, access_token)
