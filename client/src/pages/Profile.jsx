import React, { useContext } from 'react'
import Sidenav from '../components/Sidenav'
import { AppContext } from '../context/appContext';
import Navbar from '../components/Navbar';
import { Col, Container, Row } from 'react-bootstrap';
import ProfileComponent from '../components/ProfileComponent';
import './profile.css'

const Profile = () => {

  const userDetails = useContext(AppContext);

  return (
    <div className='vh-100'>
      <Navbar showlogout={true} />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} className='ps-0' id='sidebar'><Sidenav userdetails={userDetails} /></Col>
          <Col xs={12} md={9} className='component-profile'><ProfileComponent userdetails={userDetails} /></Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile