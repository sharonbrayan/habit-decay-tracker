import React from 'react'
import PointsComponent from '../components/PointsComponent'
import Sidenav from '../components/Sidenav'
import Navbar from '../components/Navbar'
import { Col, Container, Row } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'

const Points = () => {
    const userDetails = useContext(AppContext);
  return (
    <div>
        <Navbar showlogout={true} />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} className='ps-0' id='sidebar'><Sidenav userdetails={userDetails} /></Col>
          <Col xs={12} md={9} className='component-profile'><PointsComponent userdetails={userDetails} /></Col>
        </Row>
      </Container>
    </div>
  )
}

export default Points