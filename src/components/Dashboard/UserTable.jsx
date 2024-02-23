import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"


import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import { useState } from "react"
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import {
    editUserDetails,
    deleteUser,
} from "../../services/operations/userDetailsAPI"
import ConfirmationModal from "../common/ConfirmationModal"

export default function UserTable({ user, setUser }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleUserDelete = async (userId) => {
    setLoading(true)
    await deleteUser({ userId: userId }, token)
    setConfirmationModal(null)
    setLoading(false)
  }


  return (
    <>
    <Table className="rounded-xl border border-richblack-800 ">
      <Thead>
        <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
          <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
            Name
          </Th>
          <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
            Name & e-mail
          </Th>
          <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
            
          </Th>
          <Th className="text-left text-sm font-medium uppercase text-richblack-100">
            
          </Th>
          <Th className="text-left text-sm font-medium uppercase text-richblack-100">
            
          </Th>
          <Th className="text-left text-sm font-medium uppercase text-richblack-100">
            Action
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {user?.length === 0 ? (
          <Tr>
            <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
              No Users found
            </Td>
          </Tr>
        ) : (
          user?.map((user) => (
            <Tr
              key={user._id}
              className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
            >
              <Td className="flex flex-1 gap-x-4">
                <img
                  src={user?.thumbnail}
                  alt={user?.firstName}
                  className="h-[148px] w-[220px] rounded-lg object-cover"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-lg font-semibold text-richblack-5">
                    {`${user.firstName} ${user.lastName}`}
                  </p>
                  <p className="text-xs text-richblack-300">
                    {user.email}
                  </p>
                  <p className="text-[12px] text-white">
                    {/* Created: {formatDate(user.createdAt)} */}
                  </p>
                  
                </div>
              </Td>
              
              <Td className="text-sm font-medium text-richblack-100 ">
                <button
                  disabled={loading}
                  onClick={() => {
                    navigate(`/dashboard/edit-user/${user._id}`)
                  }}
                  title="Edit"
                  className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                >
                  <FiEdit2 size={20} />
                </button>
                <button
                  disabled={loading}
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Do you want to delete this user?",
                      text2:
                        "All the data related to this user will be deleted",
                      btn1Text: !loading ? "Delete" : "Loading...  ",
                      btn2Text: "Cancel",
                      btn1Handler: !loading
                        ? () => handleUserDelete(user._id)
                        : () => {},
                      btn2Handler: !loading
                        ? () => setConfirmationModal(null)
                        : () => {},
                    })
                  }}
                  title="Delete"
                  className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </Td>
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
  </>
  )
}