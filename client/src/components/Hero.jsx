import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import logo1 from '../assets/logo1.svg';
import logo2 from '../assets/logo2.svg';
import logo3 from '../assets/logo3.png';

const Hero = () => {
    return (
        <div>
            <Container className='mt-5'>
                <Row>
                    <Col><h3 className='text-center'>Every day you choose to try is another brick <br /> in the foundation of your  success.</h3>
                    </Col>
                </Row>
                <Row className='text-center mt-4'>
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
                    <Col md={4} className='mt-2 d-flex flex-column justify-content-center align-items-center'>
                        <img src={logo3} alt="" height={90} width={90} className='mb-2'/>
                        <h4>Bounce back stronger</h4>
                        <p className='w-75'>Spot trends and triggers that lead to habit breaks</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Hero