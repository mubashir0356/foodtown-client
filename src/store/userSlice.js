import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    status: false,
    userData: null
}

const userSlice = createSlice({
    name: "userSlice",
    initialState: initialUserState,
    reducers: {
        login: (state, action) => {
            console.log(action.payload, "payload")
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export default userSlice.reducer

export const { login, logout } = userSlice.actions