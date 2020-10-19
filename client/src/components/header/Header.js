import React from 'react'
import {Navbar, Nav } from 'react-bootstrap'
import {useSelector} from 'react-redux'
import HeadMember from './HeadMember'
import HeadVisitor from './HeadVisitor'
import LoginModal from './LoginModal'
import Logo from './Logo'

function Header() {

    const isLoggedIn = useSelector(state => state.login.connected)

    return (
      <>
        {/* {showLoginModal && <LoginModal />} */}
        <Navbar bg="light" expand="lg">
          <Logo />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                
              </Nav>
              {
                isLoggedIn 
                ? <HeadMember />
                : <HeadVisitor />
              }
          
          </Navbar.Collapse>
        </Navbar>

</>

      
    )
}

export default Header
