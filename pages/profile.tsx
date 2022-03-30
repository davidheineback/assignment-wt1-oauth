import React from 'react'
import styles from '../styles/Home.module.css'
import { getUserData } from '../utils/config'
import Image from 'next/image'
import Link from 'next/link'
import {
  setSessionToken,
  invalidToken,
  redirectWithNewStateFrom,
  withSessionSsr,
} from '../utils/server-side-props'
import { GetServerSidePropsContext } from 'next'
import { IronSession } from 'iron-session'
import Error from 'next/error'
import Loader from '../components/Loader'
import createErrorProps from '../utils/create-error'

/**
 * Create props for Ssr and session data is stored in encrypted cookies
 */
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({
    req,
    query,
  }: GetServerSidePropsContext): Promise<any> {
    const { code, state } = query
    // check for code and validates session state
    if (code) {
      if (state === req.session.state) {
        req.session.tokens = await setSessionToken(code as string, false)
        await req.session.save()
        return {
          redirect: {
            destination: '/profile',
            permanent: false,
          },
        }
      } else {
        return createErrorProps(401, 'Unauthorized')
      }
    } else if (!req.session.tokens) {
      const redirect = await redirectWithNewStateFrom(req.session)
      return redirect
    } else if (
      req.session.tokens.expiration &&
      invalidToken(req.session.tokens.expiration)
    ) {
      const { refresh_token } = req.session.tokens
      if (refresh_token) {
        req.session.tokens = await setSessionToken(refresh_token, true)
      } else {
        return createErrorProps(401, 'Unauthorized')
      }

      await req.session.save()
    }

    try {
      if (req.session.tokens?.access_token) {
        req.session.user = await getUserData(req.session.tokens.access_token)
      }

      await req.session.save()

      return {
        props: {
          user: req.session.user,
          pageTitle: 'Profile',
        },
      }
    } catch (error: any) {
      return createErrorProps(401, 'Unauthorized')
    }
  }
)

/**
 * JSX returning the index component.
 */
function Profile({ user, error }: IronSession) {
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
      user && (
        <main className={styles.main}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h1>{user.name}</h1>
              <div style={{ borderRadius: '100px', overflow: 'hidden' }}>
                <Image
                  width="100px"
                  height="100px"
                  src={user.avatar_url}
                  alt="avatar"
                />
              </div>
              <div>Username: {user?.username}</div>
              <div>User ID: {user?.id}</div>
              <div>Email: {user.email}</div>
              <div>Last activity on: {user.last_activity_on}</div>
              <Link href="/activities" passHref>
                <h3 className={styles.clickEventStyle}>
                  List activties &rarr;
                </h3>
              </Link>
              <Link href="/logout" passHref>
                <h3 className={styles.clickEventStyle}>Logout &rarr;</h3>
              </Link>
            </div>
          </div>
        </main>
      )
    )
  }
}

export default Profile
