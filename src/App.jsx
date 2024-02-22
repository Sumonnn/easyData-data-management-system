import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import Dashboard from './pages/Dashboard'
import MyProfile from "./components/Dashboard/MyProfile"
import Error from './pages/Error'


const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />}/>


        <Route element={<Dashboard />}>
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          {/* <Route path="dashboard/Settings" element={<Settings />} /> */}

        </Route>


      <Route path='*' element={<Error />} />

      </Routes>
    </div>
  )
}

export default App