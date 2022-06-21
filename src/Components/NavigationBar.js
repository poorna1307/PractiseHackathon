import React from 'react'
import {Routes,Route} from 'react-router-dom';
import logo from '../Images/logo.jpg';
import Home from './Home';
import Stats from './Stats';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from 'react-router-dom';
function NavigationBar() {
  return (
    <div>
        <div>
         <Navbar bg="light" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><img src={logo} style={{height:'4rem'}}></img></Navbar.Brand>
          <Nav className="ma-auto" style={{fontSize:"1.2rem"}}>
            <Nav.Link><NavLink className="text-secondary " to="" style={{ textDecoration: 'none' }}>Home</NavLink></Nav.Link>
            <Nav.Link><NavLink className="text-secondary" to="stats" style={{ textDecoration: 'none' }}>Our Statistics</NavLink></Nav.Link>
            <Nav.Link><NavLink className="text-secondary" to="login" style={{ textDecoration: 'none' }}>Login</NavLink></Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/stats" element={<Stats/>}/>
        <Route path="/login" element={<Home/>}/>
      </Routes>
    </div>
    </div>
  )
}

export default NavigationBar