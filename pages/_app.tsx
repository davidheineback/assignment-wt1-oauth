import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav } from 'react-bootstrap'
import React from 'react'


function MyApp({ Component, pageProps }: AppProps) {
    return (
      <>
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href='/'>GitLab OAuth Application</Navbar.Brand>
        {pageProps.user &&
        <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/activities">Activities</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
              </Nav>
        </Navbar.Collapse>
        </>
        }
      </Container>
    </Navbar>
   <Component {...pageProps} />  
    </>
    )
}



export default MyApp
