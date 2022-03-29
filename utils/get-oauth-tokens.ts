import axios from 'axios'

interface GitLabTokensData {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  created_at: number
  token_type: string
}

type optionsInterface = {
  client_id: string
  client_secret: string
  redirect_uri: string
  grant_type: string
  refresh_token?: string
  code?: string
}


// Method to revoke access token from GitLab.
export async function revokeGitLabAccess(token: string) {
  const res = await axios.post('https://gitlab.lnu.se/oauth/revoke', {
    client_id: process.env.NEXT_PUBLIC_GITLAB_APP_ID,
    client_secret: process.env.GITLAB_SECRET!,
    token
  })
} 

type RequestType = {
  refresh_token: boolean // if request refers to refresh token set to true, else set to false.
  code: string
}

/**
 * Method to get tokens from GitLab.
 */
export async function getOAuthTokens({code, refresh_token}:RequestType): Promise<GitLabTokensData> {
  const url = process.env.NEXT_PUBLIC_TOKEN_ENDPOINT!

  let options: optionsInterface = {
    client_id: process.env.NEXT_PUBLIC_GITLAB_APP_ID!,
    client_secret: process.env.GITLAB_SECRET!,
    redirect_uri: process.env.NEXT_PUBLIC_GITLAB_OAUTH_REDIRECT_URI!,
    grant_type: refresh_token ? 'refresh_token' : 'authorization_code'
  }

  // if the parameter includes the keyword 
  if (refresh_token) {
    options.refresh_token = code
    } else {
    options.code = code
    }
  

  try {
    const res = await axios.post<GitLabTokensData>(
      url,
      new URLSearchParams(options).toString()
    )
    return res.data
  } catch (error: any) {
    console.error(error, 'Failed to fetch GitLab Oauth Tokens')
    throw new Error(error.message)
  }
}