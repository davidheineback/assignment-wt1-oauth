import axios from 'axios'

export async function getGitlabUserActivtiesFrom(userID: string, access_token: string) {
  try {
    const res = await axios.get(
      `https://gitlab.lnu.se/api/v4/users/${userID}/events?per_page=20`,
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