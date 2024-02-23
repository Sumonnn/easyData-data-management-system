import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import Dashboard from './pages/Dashboard'
import MyProfile from "./components/Dashboard/MyProfile"
import Error from './pages/Error'
import AddUser from './components/Dashboard/AddUser'
import PrivateRoute from "./components/Auth/PrivateRoute"
import NewUser from './components/Dashboard/NewUser'


const App = () => {
  return (
    <div className='w-full h-screen bg-richblack-900'>

      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />


        <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path='dashboard/user' element={<AddUser />} />
          <Route path='dashboard/create-new-user' element={<NewUser/>}/>
          {/* <Route path="dashboard/Settings" element={<Settings />} /> */}

        </Route>


        <Route path='*' element={<Error />} />

      </Routes>
    </div>
  )
}

export default App