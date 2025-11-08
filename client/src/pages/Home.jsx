import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { Col, Container, Row } from 'react-bootstrap';
import Sidenav from '../components/Sidenav';

const Home = () => {
    const [userName, setuserName] = useState("")
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/userdata',{withCredentials:true});
                if (data.success) {
                     setuserName(data.user.name);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.log(3);
                console.log(error);
            }
        })();
    }, [])

    return (
        <div>
            <Navbar showlogout={true}/>
            <Container fluid>
                <Row>
                    <Col xs={3} className='ps-0'><Sidenav username={userName}/></Col>
                    <Col xs={9}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home