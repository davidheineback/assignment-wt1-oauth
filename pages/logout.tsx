
import { withSessionSsr } from '../utils/server-side-props'
import { revokeAccess } from '../utils/config'

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }: any): Promise<any> {
  
      req.session?.tokens?.access_token && revokeAccess(req.session?.tokens?.access_token)
      req.session.destroy()
      
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
  })

function logout() {
  return (
    <div>logout</div>
  )
}

export default logout