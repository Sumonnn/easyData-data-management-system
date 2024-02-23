const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}

// User ENDPOINTS
export const userEndpoints = {
    GET_USER_ALLDETAILS_API: BASE_URL + "/user/showAllUser",
    GET_USER_CREATED_API: BASE_URL + "/user/createUser",
    GET_USER_UPDATE_API: BASE_URL + "/user/editUser",
    GET_USER_DELETE_API:BASE_URL + "/user/deleteUser"
}
