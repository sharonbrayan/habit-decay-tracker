import React, { useContext } from 'react'
import Sidenav from '../components/Sidenav'
import { AppContext } from '../context/appContext';
import Navbar from '../components/Navbar';
import { Col, Container, Row } from 'react-bootstrap';
import ProfileComponent from '../components/ProfileComponent';

const Profile = () => {

  const userDetails = useContext(AppContext);

  return (
    <div className='vh-100'>
      <Navbar showlogout={true} />
      <Container fluid>
        <Row>
          <Col xl={3} md={12} className='ps-0'><Sidenav userdetails={userDetails} /></Col>
          <Col xs={9}><ProfileComponent userdetails={userDetails} /></Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile