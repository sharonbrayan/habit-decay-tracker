import React from 'react'
import logo1 from '../assets/logo1.svg';
import logo2 from '../assets/logo2.svg';
import logo3 from '../assets/logo3.png';
import './hero.css'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate=useNavigate();
    return (
        <div>
            <Container className='mt-5 text-center'>
                <Row>
                    <Col><h1 className='text-center py-3 fw-bold px-2'>"Every day you choose to try is another brick in the foundation of your  success"</h1>
                    <button className='btn btn-success my-5 btn-lg' onClick={()=>navigate('/signup')}>Do it Everyday</button>
                    </Col>
                </Row>
                <Row className='text-center mt-4'>
                    <h2 className='fw-bold mb-5'>Simple Habit Tracker App</h2>
                    <Col md={4} className='d-flex flex-column justify-content-center align-items-center gap-1'>
                        <img src={logo1} alt="" height={100} width={100}/>
                        <h4>Track your slip-ups</h4>
                        <p className='w-75'>Building consistency is the key to lasting habits. Show up daily, even if it's just a small step.</p>
                    </Col>
                    <Col md={4} className='d-flex flex-column justify-content-center align-items-center gap-1'>
                        <img src={logo2} alt="" height={100} width={100}/>
                        <h4>Understand your patterns</h4>
                        <p className='w-75'>Spot trends and triggers that lead to habit breaks</p>
                    </Col>
                    <Col md={4} className='pt-3 d-flex flex-column justify-content-center align-items-center'>
                        <img src={logo3} alt="" height={70} width={70} className='mb-4'/>
                        <h4>Bounce back stronger</h4>
                        <p className='w-75'>Seeing how far you’ve come can be a powerful motivator. Track your actions and celebrate the journey.</p>
                    </Col>
                </Row>  
                <button className='btn btn-success my-5 btn-lg' onClick={()=>navigate('/signup')}>Get started</button>
            </Container>
            <div className='my-5'>&nbsp;</div>
        </div>
    )
}

export default Hero