import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { withIronSessionSsr } from 'iron-session/next'
import { OAuthURI, cookieOptions } from '../utils/config'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req }: any): Promise<any> {
    const { access_token } = req.session.tokens
      if (access_token) {
        return {
          redirect: {
            destination: '/profile',
            permanent: false,
          }
      }
    } else {
      return {
        props: {} 
      }
    }
  }, cookieOptions
)

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>assignment-wt1-oauth</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to this Oauth Application
        </h1>

        <div className={styles.grid}>
          <a href={OAuthURI} className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>Login with your GitLab credentials.</p>
          </a>
        </div>
      </main>
    </div>
  )
}

export default Home
