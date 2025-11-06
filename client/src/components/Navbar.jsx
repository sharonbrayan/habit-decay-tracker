import React from 'react'
import logo from '/logo.png';
import "./navbar.css"
import { Col, Container, Row } from 'react-bootstrap';
const Navbar = () => {
  return (
    <div>
        <Container className='pt-2'>
            <Row>
                <Col xs={3} className='d-flex align-items-center gap-2'>
                <img src={logo} alt="" height={50} width={50}/>
                <h3>HabitHorizon</h3>
                </Col>
                <Col xl={{span:2, offset:7}} className='d-flex gap-3 align-items-center'>
                <div className='btn btn-success signup fw-medium'>Sign Up</div>
                <div className='btn btn-outline-success fw-medium'>Login</div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Navbar