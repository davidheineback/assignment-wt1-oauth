import axios from 'axios'

export async function getGitLabUserFrom(access_token: string) {
  try {
    const res = await axios.get(
      'https://gitlab.lnu.se/api/v4/user',
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    return res.data
  } catch (error) {
    console.log(error)
  }
}