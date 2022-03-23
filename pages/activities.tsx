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
         {
           activities.map((activity: any, index: number) => {
            return <div key={index}>{activity.id}</div>
           })
         }
      </div>
    </div>
  </main>
  )
}

export default Activities


// getActivitiesFor(user.id, access_token, token_type)
