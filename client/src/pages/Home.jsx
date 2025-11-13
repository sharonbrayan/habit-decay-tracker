import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { Col, Container, Row } from 'react-bootstrap';
import Sidenav from '../components/Sidenav';
import HomeComponent from '../components/HomeComponent';
import { AppContext } from '../context/appContext';

const Home = () => {
   const userDetails=useContext(AppContext);

    return (
        <div className='vh-100'>
            <Navbar showlogout={true}/>
            <Container fluid>
                <Row>
                    <Col md={3}  xs={12} className='ps-0'><Sidenav userdetails={userDetails}/></Col>
                    <Col md={9} xs={12}><HomeComponent/></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home