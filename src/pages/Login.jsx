import React from 'react'
import Template from '../components/Auth/Template'
import img from "../assets/login.webp"



const Signup = () => {
  return (
    <div className='bg-richblack-100 flex items-center justify-center w-full h-screen'>
        <div className='bg-richblack-900 flex overflow-hidden rounded-md w-3/4 h-4/5'>
            <div className='flex flex-col px-10 py-10 w-1/2 h-full border-r-2 border-slate-800'>
                 <Template
                    title="Welcome back"
                    description="Glad to see you again 👋 Login to your account below"
                    formType="login"
                 />
            </div>   
            <div className='w-1/2 h-full bg-richblack-400'>
                  <img className='w-full h-full object-cover' src={img} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Signup