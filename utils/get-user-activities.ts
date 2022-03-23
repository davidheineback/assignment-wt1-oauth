import axios from 'axios'

export async function getGitlabUserActivtiesFrom(userID: string, access_token: string) {
  try {
    const list = []
    let pageIndex = 1
    do {
      const res = await axios.get(
        `https://gitlab.lnu.se/api/v4/users/${userID}/events?per_page=20&page=${pageIndex}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
        )
        list.push(...res.data)
        pageIndex++
      } while (list.length < 101)
    return list.slice(0, 101)
  } catch (error) {
    console.log(error)
  }
}