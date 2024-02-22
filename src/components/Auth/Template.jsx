import React, { useState } from 'react'
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"
import { useSelector } from 'react-redux'




const Template = ({ title, description, formType }) => {

    const {loading} = useSelector((state) => state.auth)

  return (
    <div>
       <h1 className='text-richblack-50 font-bold text-4xl'>{title}</h1>
       <p className='text-richblack-50 text-xs mt-3'>{description}</p>
        {
            loading ? 
            (<div className='spinner'></div>)
            : (<div>
                {formType === "signup" ? <SignupForm /> : <LoginForm/>}
            </div>)
        }
    </div>
  )
}

export default Template