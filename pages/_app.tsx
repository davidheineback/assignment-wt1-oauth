import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav } from 'react-bootstrap'
import React from 'react'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  console.log(pageProps)
    return (
      <>
      <Layout title={pageProps.pageTitle} user={pageProps.user}>
        <Component {...pageProps} />  
      </Layout>
    </>
    )
}



export default MyApp
