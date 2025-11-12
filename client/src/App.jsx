import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Activities from './pages/Activities';
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/activities/:name' element={<Activities/>}/>

      </Routes>
    </div>
  )
}

export default App