
import { withIronSessionSsr } from 'iron-session/next'
import { cookieOptions } from '../utils/config'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req }: any): Promise<any> {
        req.session.destroy()
      
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
  }, cookieOptions
)

function logout() {
  return (
    <div>logout</div>
  )
}

export default logout