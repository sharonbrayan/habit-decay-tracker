import React from 'react'
import logo from '/logo.png';
import "./navbar.css";
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const Navbar = ({ showlogout }) => {
  const location = useLocation();
  const showAuthButtons = ['/'].includes(location.pathname);
  const navigate = useNavigate();
  const logout = async () => { 
    try {
      const {data}=await axios.post('http://localhost:4000/api/logout',{withCredentials:true});
      if(data.success){
        toast.success(data.message);
        navigate('/');
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      
        console.log(error);
      
    }
  }
  return (
    <div style={{height:"74px"}}>
      <Container fluid className='pt-4 px-lg-5 px-3'>
        <Row className='d-flex justify-content-end'>
          <Col className='d-flex align-items-center gap-2' style={{ cursor: "pointer" }}>
            <img src={logo} alt="" height={50} width={50} onClick={() => navigate('/')} />
            <h3 onClick={() => navigate('/')}>HabitHorizon</h3>
          </Col>
          {showAuthButtons ?
            <Col className='d-flex gap-3 align-items-center justify-content-end'>
              <div className='btn btn-success signup fw-medium' onClick={() => navigate('/signup')}>Sign Up</div>
              <div className='btn btn-outline-success fw-medium' onClick={() => navigate('/login')}>Login</div>
            </Col>
            : showlogout &&
            <Col className='d-flex gap-3 align-items-center justify-content-end'>
              <div className='btn btn-success signup fw-medium' onClick={() => logout()}>Logout</div>
            </Col>}
        </Row>
      </Container>
    </div>
  )
}

export default Navbar