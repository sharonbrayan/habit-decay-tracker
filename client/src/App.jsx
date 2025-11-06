import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />

      </Routes>
    </div>
  )
}

export default App