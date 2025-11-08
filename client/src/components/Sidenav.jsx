import React from 'react'
import './sidenav.css'
const Sidenav = ({username}) => {
  return (
    <div className='sidenav'>
      <div className='profile-image'>
        
      </div>
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li></li>
          <li></li>
        </ul>
        <div className='close-btn d-flex justify-content-center align-items-center bg-body-secondary'>
          <img src="https://cdn-icons-png.flaticon.com/128/13589/13589081.png" alt="" height={45} width={45}/>
        </div>
    </div>
  )
}

export default Sidenav 