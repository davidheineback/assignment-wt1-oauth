import React from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { cookieOptions, getOAuthTokensFrom, getUserData } from '../utils/config'
import Image from 'next/image'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }: any): Promise<any> {
    const { code } = query

    const tokenResponse = await getOAuthTokensFrom(code)
    
    const { access_token, refresh_token, token_type } = tokenResponse
    req.session = {
      access_token,
      refresh_token
    }

    const user = await getUserData(access_token, token_type)

    const { id, name, username, email, avatar_url, last_activity_on } = user

    req.session.user = {
      id,
      name,
      username,
      email,
      avatar_url,
      last_activity_on
    }

    console.log(user)
    try {
        console.log(req.session)
        await req.session.save()
        return {
          props: {
            user: req.session.user
          }
        }
    } catch (error) {

    }
  }, cookieOptions
)

function Profile({ user }: any) {
  return (
    <>
      <h1>{user.name}</h1>
      <Image width='100px' height='100px' src={user.avatar_url} alt='avatar'/>
      <div>Username: {user.username}</div>
      <div>User ID: {user.id}</div>
      <div>Email: {user.email}</div>
      <div>Last activity on: {user.last_activity_on}</div>
    </>
  )
}

export default Profile