import { withSessionSsr } from "../utils/server-side-props"
import { revokeAccess } from "../utils/config"

/**
 * Create props for Ssr destroy session data is stored in encrypted cookies
 */
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }: any): Promise<any> {
    req.session?.tokens?.access_token &&
      // revokes access from gitlab
      revokeAccess(req.session?.tokens?.access_token)
    req.session.destroy()

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
)

function logout() {
  return <div>logout</div>
}

export default logout
