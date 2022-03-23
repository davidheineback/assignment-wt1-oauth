import React from 'react'
import styles from '../styles/Home.module.css'
import { withIronSessionSsr } from 'iron-session/next'
import { cookieOptions, getActivitiesFor } from '../utils/config'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }: any): Promise<any> {

    console.log(req.session)
    const { access_token } = req.session
    const { id } = req.session.user

    const activities = await getActivitiesFor(id, access_token)

    try {
        
        return {
          props: {
            activities
          }
        }
    } catch (error) {

    }
  }, cookieOptions
  )


function Activities({ activities }: any) {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
      <div className={styles.card}>
        <div>Activities:</div>
        <ul>
         {
           activities.map((activity: any, index: number) => {
            return (
                <div key={index} className={styles.card}>
                  {index}
                  <ul>{activity.action_name}</ul>
                  <ul>{activity.created_at}</ul>
                  <ul>{activity.target_title}</ul>
                  <ul>{activity.target_type}</ul>
                  </div>
            ) 
           })
         }
         </ul>
      </div>
    </div>
  </main>
  )
}

export default Activities


// getActivitiesFor(user.id, access_token, token_type)
