import axios from 'axios'

interface GitLabTokensData {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  created_at: number
  token_type: string
}


export async function getOAuthTokens(code: string): Promise<GitLabTokensData> {
  const url = process.env.NEXT_PUBLIC_TOKEN_ENDPOINT!
  let options = {}
  if (code.includes('refresh_token')) {
    options = {
      client_id: process.env.NEXT_PUBLIC_GITLAB_APP_ID!,
      client_secret: process.env.GITLAB_SECRET!,
      refresh_token: code.split(' ')[1],
      redirect_uri: process.env.NEXT_PUBLIC_GITLAB_OAUTH_REDIRECT_URI!,
      grant_type: 'refresh_token'
    }
    
  } else {
    options = {
      code,
      client_id: process.env.NEXT_PUBLIC_GITLAB_APP_ID!,
      client_secret: process.env.GITLAB_SECRET!,
      redirect_uri: process.env.NEXT_PUBLIC_GITLAB_OAUTH_REDIRECT_URI!,
      grant_type: 'authorization_code'
    }
  
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