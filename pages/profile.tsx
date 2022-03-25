import React from 'react'
import styles from '../styles/Home.module.css'
import { withIronSessionSsr } from 'iron-session/next'
import { cookieOptions, getUserData } from '../utils/config'
import { OAuthURI } from '../utils/config'
import Image from 'next/image'
import Link from 'next/link'
import { setSessionToken, invalidToken } from '../utils/server-side-props'



export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }: any ): Promise<any> {
    const { code } = query
    if (code) {
      req.session = await setSessionToken(code)
      await req.session.save()

      return {
        redirect: {
          destination: '/profile',
          permanent: false,
        }
      }
    } else if (!req.session.access_token) {
      return {
        redirect: {
          destination: OAuthURI,
          permanent: false,
        }
      }
    } else if(invalidToken(req.session.expiration)) {
      req.session = await setSessionToken(`refresh_token ${req.session.refresh_token}`)
      await req.session.save()
    }

    try {
      req.session.user = await getUserData(req.session.access_token)
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

function Profile({ user }: any) {
  return (
    <main className={styles.main}>
    <div className={styles.grid}>
      <div className={styles.card}>
      <h1>{user.name}</h1>
        <div style={{borderRadius: '100px', overflow: 'hidden'}}>
          <Image width='100px' height='100px' src={user.avatar_url} alt='avatar'/>
        </div>
        <div>Username: {user.username}</div>
        <div>User ID: {user.id}</div>
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
