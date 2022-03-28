
import { withSessionSsr} from '../utils/server-side-props'

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }: any): Promise<any> {
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