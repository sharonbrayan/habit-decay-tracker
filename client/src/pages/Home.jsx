import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { Col, Container, Row } from 'react-bootstrap';
import Sidenav from '../components/Sidenav';
import HomeComponent from '../components/HomeComponent';

const Home = () => {
    const [userDetails, setuserDetails] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/userdata',{withCredentials:true});
                if (data.success) {
                     setuserDetails(data.user);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])

    return (
        <div className='vh-100'>
            <Navbar showlogout={true}/>
            <Container fluid>
                <Row>
                    <Col xl={3} md={12} className='ps-0'><Sidenav userdetails={userDetails}/></Col>
                    <Col xs={9}><HomeComponent userdetails={userDetails}/></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home