import "../styles/globals.css"
import type { AppProps } from "next/app"
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import Layout from "../components/Layout"

/**
 * JSX component representing the Application.
 *
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout title={pageProps.pageTitle} user={pageProps.user}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
