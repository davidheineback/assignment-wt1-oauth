import React from 'react'
import styles from '../styles/Home.module.css'
import { Table } from 'react-bootstrap'
import { withIronSessionSsr } from 'iron-session/next'
import { cookieOptions, getActivitiesFor, OAuthURI } from '../utils/config'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req }: any): Promise<any> {
    if (!req.session.access_token) {
      return {
        redirect: {
          destination: OAuthURI,
          permanent: false,
        }
      }
    } else {

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
    }
  }, cookieOptions
  )

function Activities({ activities }: any) {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Action</th>
            <th scope="col">Created at</th>
            <th scope="col">Target title</th>
            <th scope="col">Target type</th>
          </tr>
        </thead>
        <tbody>
          {
            activities.map((activity: any, index: number) => {
              return (
                <tr key={index}> 
                  <th scope="row">{activity.action_name}</th>
                  <td>{activity.created_at}</td>
                  <td>{activity.target_title}</td>
                  <td>{activity.target_type}</td>
                </tr>
              ) 
            })
          }
        </tbody>
      </Table>
    </div>
  </main>
  )
}

export default Activities


// getActivitiesFor(user.id, access_token, token_type)
