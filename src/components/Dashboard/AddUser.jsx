import React from 'react'
import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getAllUsers } from "../../services/operations/userDetailsAPI"
import IconBtn from "../common/IconBtn"
import UserTable from "./UserTable"



const AddUser = () => {

    const navigate = useNavigate()
    const [user,setUser] = useState("");
    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
      const fetchUsers = async () => {
        const result = await getAllUsers(token)
        // console.log("User All Details"+ result);
        if (result) {
          setUser(result)
        }
      }
      fetchUsers()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">All Users</h1>
        <IconBtn
          text="Add New User"
          onclick={() => navigate("/dashboard/create-new-user")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {user && <UserTable user={user} setUser={setUser} />}
    </div>
  )
}

export default AddUser