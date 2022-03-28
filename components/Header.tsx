import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { UserData } from '../types/user-data'

interface UserInHeader {
  user?: UserData,
}

function Header({ user }:UserInHeader) {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href='/'>GitLab OAuth Application</Navbar.Brand>
      {user &&
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
  )
}

export default Header