import React from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { cookieOptions, getOAuthTokensFrom } from '../utils/config'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }: any): Promise<any> {
    const { code } = query

    const tokenResponse = await getOAuthTokensFrom(code)

    console.log(tokenResponse)

    try {
        req.session.user = 'David'
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
      <h1>{user}</h1>
      <div>Profile component</div>
    </>
  )
}

export default Profile