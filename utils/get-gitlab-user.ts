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
    
      const filteredUserData = (({ 
        id, name, username, email, avatar_url, last_activity_on 
      }) => ({ 
        id, name, username, email, avatar_url, last_activity_on 
      }))(res.data)

    return filteredUserData
  } catch (error) {
    console.log(error)
  }
}