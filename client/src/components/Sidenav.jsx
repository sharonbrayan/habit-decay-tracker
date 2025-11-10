import React from 'react'
import './sidenav.css'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Sidenav = ({ userdetails }) => {
  const location = useLocation();
  const pathName=location.pathname;
  const navigate=useNavigate();
  return (
    <div className='sidenav'>
      <div className="profile d-flex flex-column align-items-center">
        <div className='profile-image-1'></div>
        <span className='text-capitalize fw-bold fs-4'>{userdetails.name}</span>
      </div>
      <ul className='list-unstyled pt-5'>
        <li className={pathName==='/home'? 'active':'inactive'} onClick={()=>{pathName!=='/home'&&navigate('/home')}}>
          <Link to={'/home'} className='text-decoration-none text-black'><i className="fa fa-home" aria-hidden="true"></i> Home</Link>
        </li>
        <li className={pathName==='/profile'? 'active':'inactive'} onClick={()=>{pathName!=='/profile'&&navigate('/profile')}}>
          <Link to={'/profile'} className='text-decoration-none text-black'><i className="fa fa-user" aria-hidden="true"></i> Profile</Link>
        </li>
        <li className={pathName==='/points'? 'active':'inactive'} onClick={()=>{pathName!=='/points'&&navigate('/points')}}>
          <Link to={'/points'} className='text-decoration-none text-black'><i className="fa fa-trophy" aria-hidden="true"></i> Points</Link>
        </li>
      </ul>
      <div className='close-btn d-flex justify-content-center align-items-center bg-body-secondary'>
        <img src="https://cdn-icons-png.flaticon.com/128/13589/13589081.png" alt="" height={45} width={45} />
      </div>
    </div>
  )
}

export default Sidenav 