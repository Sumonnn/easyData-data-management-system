import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {

    const navigate = useNavigate();




  return (
    <div className='flex flex-col gap-10 justify-center bg-richblack-900 w-full h-screen my-auto items-center text-3xl text-white'>
        <p>Error - 404 Not Found</p>
        <button onClick={()=>navigate(-1)} className='px-6 font-semibold py-3 bg-richblack-700 rounded-xl'>Go Back</button>
    </div>
  )
}

export default Error