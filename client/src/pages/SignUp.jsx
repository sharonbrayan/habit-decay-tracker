import React from 'react'
import Navbar from '../components/Navbar';
import AuthForm from '../components/AuthForm';
const SignUp = () => {
  return (
    <div>
      <Navbar/>
      <AuthForm auth={"signup"}/>
    </div>
  )
}

export default SignUp