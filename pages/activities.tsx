import React from 'react'
import styles from '../styles/Home.module.css'
import { Table } from 'react-bootstrap'
import {
  redirectWithNewStateFrom,
  withSessionSsr,
} from '../utils/server-side-props'
import { getActivitiesFor, OAuthURI } from '../utils/config'
import { GetServerSidePropsContext } from 'next'
import Loader from '../components/Loader'
import TableContent from '../components/TableContent'
import { ActivityContainer } from '../types/acitvity-types'
import Error from 'next/error'
import { IronSession } from 'iron-session'
import createErrorProps from '../utils/create-error'

/**
 * Create props for Ssr and session data is stored in encrypted cookies
 */
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({
    req,
  }: GetServerSidePropsContext): Promise<any> {
    try {
      if (!req.session.tokens?.access_token) {
        const redirect = await redirectWithNewStateFrom(req.session)
        return redirect
      } else if (req.session.user) {
        const { access_token } = req.session.tokens
        const { id } = req.session.user
        const activities: ActivityContainer =
          (await getActivitiesFor(id, access_token)) || []
        await new Promise((resolve) => setTimeout(resolve, 3000))
        return {
          props: {
            user: req.session.user,
            activities,
            pageTitle: 'Activities',
          },
        }
      }
    } catch (error) {
      return createErrorProps(400, 'Bad request')
    }
  }
)

/**
 * Create a JSX representation of Activities module that get activities props
 */
function Activities({
  activities,
  error,
}: {
  activities: ActivityContainer
  error: IronSession['error']
}) {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsLoading(false)
  }, [isLoading])

  if (error) {
    return <Error title={error.message} statusCode={error.code} />
  }

  if (isLoading) {
    return <Loader />
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
