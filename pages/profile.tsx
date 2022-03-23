import React from 'react'
import styles from '../styles/Home.module.css'
import { withIronSessionSsr } from 'iron-session/next'
import { cookieOptions, getOAuthTokensFrom, getUserData } from '../utils/config'
import { OAuthURI } from '../utils/config'
import Image from 'next/image'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }: any): Promise<any> {
    const { code } = query

    if (code) {
      const tokenResponse = await getOAuthTokensFrom(code)
      const { access_token, refresh_token } = tokenResponse
      req.session = {
        access_token,
        refresh_token
      }
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
    }

    try {
      const user = await getUserData(req.session.access_token)

      const { id, name, username, email, avatar_url, last_activity_on } = user
  
      req.session.user = {
        id,
        name,
        username,
        email,
        avatar_url,
        last_activity_on
      }
        await req.session.save()
        
        return {
          props: {
            user: req.session.user,
          }
        }
    } catch (error) {

    }
  }, cookieOptions
)

function Profile({ user }: any) {
  return (
    <main className={styles.main}>
    <div className={styles.grid}>
      <div className={styles.card}>
      <h1>{user.name}</h1>
        <Image width='100px' height='100px' src={user.avatar_url} alt='avatar'/>
        <div>Username: {user.username}</div>
        <div>User ID: {user.id}</div>
        <div>Email: {user.email}</div>
        <div>Last activity on: {user.last_activity_on}</div>
        <a href='./activities'>
        <h3>List activties &rarr;</h3>
        </a>
      </div>
    </div>
  </main>
  )
}

export default Profile
