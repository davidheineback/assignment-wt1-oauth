import React from 'react'
import styles from '../styles/Home.module.css'
import { Table } from 'react-bootstrap'
import { withSessionSsr } from '../utils/server-side-props'
import { getActivitiesFor, OAuthURI } from '../utils/config'

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }: any): Promise<any> {
    if (!req.session.tokens.access_token) {
      return {
        redirect: {
          destination: OAuthURI(req.session.state),
          permanent: false,
        }
      }
    } else {

      const { access_token } = req.session.tokens
      const { id } = req.session.user
      
      const activities = await getActivitiesFor(id, access_token)
      
      try {
        return {
          props: {
            user: req.session.user,
            activities
          }
        }
      } catch (error) {
        
      }
    }
  })

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


