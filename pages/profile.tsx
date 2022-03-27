import React from 'react'
import styles from '../styles/Home.module.css'
import { withIronSessionSsr } from 'iron-session/next'
import { cookieOptions, getUserData } from '../utils/config'
import { OAuthURI } from '../utils/config'
import Image from 'next/image'
import Link from 'next/link'
import { setSessionToken, invalidToken, generateState } from '../utils/server-side-props'
import { GetServerSidePropsContext } from 'next'
import { IronSession } from 'iron-session'



export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }: GetServerSidePropsContext): Promise<any> {
    const { code, state } = query
    if (code && typeof code === 'string') {
      if (state === req.session.state) {
        req.session.tokens = await setSessionToken(code)
        await req.session.save()
      } else {
        req.session.destroy()
        return {
          props: {
            tokens: null,
            error: {
              code: 401,
              message: 'Unauthorized'
            }
          }
        }
      }


      return {
        redirect: {
          destination: '/profile',
          permanent: false,
        }
      }
    } else if (!req.session.tokens) {
      req.session.state = generateState()
      await req.session.save()
      return {
        redirect: {
          destination: OAuthURI(req.session.state),
          permanent: false,
        }
      }
    } else if(req.session.tokens.expiration && invalidToken(req.session.tokens.expiration)) {
      req.session.tokens = await setSessionToken(`refresh_token ${req.session.tokens?.refresh_token}`)
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
          }
        }
    } catch (error: any) {
      console.log(error)
    }
  }, cookieOptions
)

function Profile({ user }:IronSession) {
  return (
    user &&
    <main className={styles.main}>
    <div className={styles.grid}>
      <div className={styles.card}>
      <h1>{user.name}</h1>
        <div style={{borderRadius: '100px', overflow: 'hidden'}}>
          <Image width='100px' height='100px' src={user.avatar_url} alt='avatar'/>
        </div>
        <div>Username: {user?.username}</div>
        <div>User ID: {user?.id}</div>
        <div>Email: {user.email}</div>
        <div>Last activity on: {user.last_activity_on}</div>
        <Link href='/activities' passHref>
          <h3>List activties &rarr;</h3>
        </Link>
        <Link href='/logout' passHref>
          <h3>Logout &rarr;</h3>
        </Link>
        
      </div>
    </div>
  </main>
  )
}

export default Profile
