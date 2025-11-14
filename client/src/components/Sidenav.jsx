import React, { useEffect } from 'react'
import './sidenav.css'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Sidenav = ({ userdetails }) => {
  const [showSidebar, setshowSidebar] = useState(false);
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();
  useEffect(() => {
    setshowSidebar(window.innerWidth >= 768);
  }, [])
  
  return (
    <>
      {
        showSidebar ? <div className='sidenav z-2' id='sidebar'>
          <div className="profile d-flex flex-column align-items-center">
            <div className='profile-image-1'></div>
            <span className='text-capitalize fw-bold fs-4'>{userdetails.name}</span>
          </div>
          <ul className='list-unstyled pt-5'>
            <li className={pathName === '/home' ? 'active' : 'inactive'} onClick={() => { pathName !== '/home' && navigate('/home') }}>
              <Link to={'/home'} className='text-decoration-none text-black'><i className="fa fa-home" aria-hidden="true"></i> Home</Link>
            </li>
            <li className={pathName === '/profile' ? 'active' : 'inactive'} onClick={() => { pathName !== '/profile' && navigate('/profile') }}>
              <Link to={'/profile'} className='text-decoration-none text-black'><i className="fa fa-user" aria-hidden="true"></i> Profile</Link>
            </li>
            <li className={pathName === '/points' ? 'active' : 'inactive'} onClick={() => { pathName !== '/points' && navigate('/points') }}>
              <Link to={'/points'} className='text-decoration-none text-black'><i className="fa fa-trophy" aria-hidden="true"></i> Points</Link>
            </li>
          </ul>
          <i className="fa fa-arrow-circle-left d-block d-md-none fs-2 m-auto" aria-hidden="true" onClick={()=>setshowSidebar(!showSidebar)}></i>
        </div>
          :
          <i className="fa fa-bars fs-3 ms-3 d-block d-md-none z-2" id='humburger' aria-hidden="true" onClick={()=>setshowSidebar(!showSidebar)}></i>
      }
    </>
  )
}

export default Sidenav 