import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: 
    {
        isLoggedIn: false,
        role: null
    },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.role = null;
        },
        setRole: (state,action) => {
            state.role = action.payload;
        }
    }
})

export const { login, logout, setRole } = authSlice.actions;

//Importing the reducer
export default authSlice.reducer;