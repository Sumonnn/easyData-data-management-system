import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'


const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />}/>

      </Routes>
    </div>
  )
}

export default App