import React from 'react'
import Navbar from '../components/Navbar';
import AuthForm from '../components/AuthForm';
const Login = () => {
  return (
    <div>
      <Navbar/>
      <AuthForm auth={"login"}/>
    </div>
  )
}

export default Login