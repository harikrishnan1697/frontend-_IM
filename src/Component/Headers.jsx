import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function Headers() {
    let logout = useLogout()
    let navigate = useNavigate()
  return (
    
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <Navbar.Brand className='app'>Order Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto header-nav-items pointer">
          <Nav.Item className="pointer" onClick={()=>navigate('/productreport')}>Product Report</Nav.Item>
          <Nav.Item className="pointer" onClick={()=>navigate('/addproduct')}>Add Product</Nav.Item>
          <Nav.Item className="pointer" onClick={()=>navigate('/addsells')}>Create Sell</Nav.Item>
          <Nav.Item className="pointer" onClick={()=>navigate('/sellsreport')}>Sells Report</Nav.Item>
          <Nav.Item className="pointer" onClick={logout}><Button variant='danger'>Logout</Button></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
  }
export default Headers
