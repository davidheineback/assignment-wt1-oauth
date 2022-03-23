import axios from 'axios'

export async function getGitLabUserFrom(access_token: string, token_type: string) {
  try {
    const res = await axios.get(
      'https://gitlab.lnu.se/api/v4/user',
      {
        headers: {
          Authorization: `${token_type} ${access_token}`
        }
      }
    )
    return res.data
  } catch (error) {
    console.log(error)
  }
}