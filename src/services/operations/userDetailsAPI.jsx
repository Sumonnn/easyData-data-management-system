import { userEndpoints } from "../apis";
import { apiconnecter } from "../apiconnecter"
import toast from "react-hot-toast";


const {
    GET_USER_ALLDETAILS_API,
    GET_USER_CREATED_API,
    GET_USER_UPDATE_API,
    GET_USER_DELETE_API
} = userEndpoints;


export const getAllUsers = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiconnecter("GET", GET_USER_ALLDETAILS_API,{
            Authorisation: `Bearer ${token}`,
          })
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch User Details")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("GET_ALL_USER_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}



// add the User details
export const addUserDetails = async (data,navigate, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiconnecter("POST", GET_USER_CREATED_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        })
        console.log("CREATE USER API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add User Details")
        }
        toast.success("User Details Added Successfully")
        result = response?.data?.data
        navigate("/dashboard/user");
    } catch (error) {
        console.log("CREATE USER API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}



// edit the User details
export const editUserDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnecter("POST", GET_USER_UPDATE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorisation: `Bearer ${token}`,
      })
      console.log("EDIT USER API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update User Details")
      }
      toast.success("User Details Updated Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("EDIT USER API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


  // delete a User
export const deleteUser = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnecter("POST", GET_USER_DELETE_API, data, {
        Authorisation: `Bearer ${token}`,
      })
      console.log("DELETE USER API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete USER")
      }
      toast.success("USER Deleted")
    } catch (error) {
      console.log("DELETE USER API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
  }

