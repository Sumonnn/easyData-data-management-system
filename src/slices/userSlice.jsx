import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    UserData: null,
    editUser:false,
    Userloading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUserData(state, value) {
            state.signupData = value.payload;
        },
        setUserloading(state, value) {
            state.loading = value.payload;
        },
        setEditUser: (state, action) => {
            state.editUser = action.payload
        },
    },
});


export const { setUserData, setUserloading, setEditUser } = userSlice.actions;
export default userSlice.reducer;