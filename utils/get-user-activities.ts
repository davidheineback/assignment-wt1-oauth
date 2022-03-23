import axios from 'axios'

export async function getGitlabUserActivtiesFrom(userID: string, access_token: string, token_type:string) {
  try {
    const res = await axios.get(
      `https://gitlab.lnu.se/api/v4/users/${userID}/events?per_page=100`,
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