import React from 'react'
import logo from '/logo.png';
import "./navbar.css";
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
const Navbar = ({showlogout}) => {
  const location=useLocation();
  console.log(location);
  const showAuthButtons=['/'].includes(location.pathname);
  const navigate=useNavigate();
  return (
    <div>
        <Container fluid className='pt-4 px-lg-5 px-3'>
            <Row className='d-flex justify-content-end'>
                <Col className='d-flex align-items-center gap-2'>
                <img src={logo} alt="" height={50} width={50}/>
                <h3>HabitHorizon</h3>
                </Col>
                {showAuthButtons?
                <Col className='d-flex gap-3 align-items-center justify-content-end'>
                <div className='btn btn-success signup fw-medium' onClick={()=>navigate('/signup')}>Sign Up</div>
                <div className='btn btn-outline-success fw-medium' onClick={()=>navigate('/login')}>Login</div>
                </Col>
                :showlogout&&
                <Col className='d-flex gap-3 align-items-center justify-content-end'>
                <div className='btn btn-success signup fw-medium' onClick={()=>navigate('/signup')}>Logout</div>
                </Col>}
            </Row>
        </Container>
    </div>
  )
}

export default Navbar