import React from 'react'
import styles from '../styles/Home.module.css'
import { Table } from 'react-bootstrap'
import { generateState, withSessionSsr } from '../utils/server-side-props'
import { getActivitiesFor, OAuthURI } from '../utils/config'
import { GetServerSidePropsContext } from 'next'
import Loader from '../components/Loader'
import TableContent from '../components/TableContent'
import { ActivityContainer } from '../types/acitvity-types'

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }: GetServerSidePropsContext): Promise<any> {
    if (!req.session.tokens?.access_token) {
      req.session.state = generateState()
      await req.session.save()
      return {
        redirect: {
          destination: OAuthURI(req.session.state),
          permanent: false,
        }
      }
    } else if (req.session.user) {
      const { access_token } = req.session.tokens
      const { id } = req.session.user
      
      const activities: ActivityContainer = await getActivitiesFor(id, access_token) || []
      
      try {
        return {
          props: {
            user: req.session.user,
            activities,
            pageTitle: 'Activities'
          }
        }
      } catch (error) {
        
      }
    }
  })

function Activities({ activities }: {activities: ActivityContainer}) {  
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
      setIsLoading(false)
  },[isLoading])

  if (isLoading) {
    return (
      <Loader/>
    )
  } else {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
      <Table striped bordered hover>
      <TableContent activities={activities}></TableContent>
      </Table>
    </div>
  </main>
  )
}
}

export default Activities


