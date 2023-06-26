import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../api/userSlice';
axios.defaults.withCredentials = true;
import axios from  'axios';

const NavBar = () => {
  // const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const userRole = useSelector((state) => state.auth.role);
  // const sendLogoutRequest = async () => {
  //   const response = await axios.post('http://localhost:3000/api/logout', null,{
  //     withCredentials: true
  //   })
  //   if(response.status == 200) {
  //     return response
  //   }
  //   return new Error("Unable to log out")
  // }
  // const handleLogout = () => {
  //   sendLogoutRequest().then(() => dispatch(logout()))
  // }
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand>Authentication</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/signup">
            SignUp
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login">
            Login
          </Nav.Link>
          {/* <Navbar.Link as={NavLink} to="/protected">
            SignUp
          </Navbar.Link> */}
            {/* {!isLoggedIn && (
              <>
                <Nav.Link as={NavLink} to="/signup">
                  SignUp
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login">
                  LogIn
                </Nav.Link>
              </>
            )}
            {isLoggedIn && userRole === 'admin' && (
              <Nav.Link as={NavLink} to="/admin/dashboard">Admin Dashboard</Nav.Link>

            )}
            {isLoggedIn && userRole === 'user' && (
             <Nav.Link as={NavLink} to="/user/dashboard">User Dashboard</Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link onClick={handleLogout} as={NavLink} to="/logout">
                Logout
              </Nav.Link>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  )
}

export default NavBar