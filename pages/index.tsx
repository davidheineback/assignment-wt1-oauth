import styles from '../styles/Home.module.css'
import { OAuthURI } from '../utils/config'
import { generateState, withSessionSsr} from '../utils/server-side-props'
import { IronSession } from 'iron-session'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }: GetServerSidePropsContext): Promise<any> {
      if (req.session?.tokens?.access_token) {
        return {
          redirect: {
            destination: '/profile',
            permanent: false,
          }
      }
    } else {
      req.session.state = generateState()
      await req.session.save()
      return {
        props: {
          user: null,
          state: req.session.state,
          pageTitle: null
        }
      }
    }
  }
)

function Home({ state }:IronSession) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to this Oauth Application
        </h1>
        <div className={styles.grid}>
          <a href={state && OAuthURI(state)} className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>Login with your GitLab credentials.</p>
          </a>
        </div>
      </main>
    </div>
  )
}

export default Home
