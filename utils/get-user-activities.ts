import axios from 'axios'
import { ActivityContainer, Activity } from '../types/acitvity-types'




export async function getGitlabUserActivtiesFrom(userID: string, access_token: string) {
  try {
    const list:ActivityContainer = []
    let pageIndex:number = 1
    let res
    do {
      res = await axios.get(
        `https://gitlab.lnu.se/api/v4/users/${userID}/events?per_page=20&page=${pageIndex}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
        )
        
        res.data.forEach((activity: any) => {
          const { action_name, created_at, target_title, target_type } = activity
          const currentActivity: Activity = {
            action_name,
            created_at,
            target_title,
            target_type
          }
          list.push(currentActivity)
        })
        pageIndex++
      } while (list.length < 101 && pageIndex < Number(res.headers['x-total-pages']))
      
    return list.slice(0, 101)
  } catch (error) {
    console.log(error)
  }
}