import axios from 'axios'
import qs from "qs";

interface GitLabTokensData {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  created_at: number
}


export async function getOAuthTokens(code: string): Promise<GitLabTokensData> {
  const url = process.env.NEXT_PUBLIC_TOKEN_ENDPOINT!

  const values = {
    code,
    client_id: process.env.NEXT_PUBLIC_GITLAB_APP_ID,
    client_secret: process.env.GITLAB_SECRET,
    redirect_uri: process.env.NEXT_PUBLIC_GITLAB_OAUTH_REDIRECT_URI,
    grant_type: "authorization_code",
  }

  try {
    const res = await axios.post<GitLabTokensData>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    return res.data;
  } catch (error: any) {
    console.error(error, "Failed to fetch GitLab Oauth Tokens");
    throw new Error(error.message)
  }
}