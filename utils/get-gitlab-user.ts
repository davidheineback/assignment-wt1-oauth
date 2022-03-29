import axios from 'axios'
import { UserData } from '../types/user-data'

/**
 * Get user data from gitlab with provided access token.
 */
export async function getGitLabUserFrom(access_token: string): Promise<UserData | undefined> {
  try {
    const res = await axios.get(
      'https://gitlab.lnu.se/api/v4/user',
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    
    // deconstruct the res.data object and save it as a filtered object of type UserData
      const filteredUserData: UserData = (({ 
        id, name, username, email, avatar_url, last_activity_on 
      }) => ({ 
        id, name, username, email, avatar_url, last_activity_on 
      }))(res.data)

    return filteredUserData
  } catch (error) {
    console.log(error)
  }
}