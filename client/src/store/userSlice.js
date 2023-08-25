import { createSlice, current } from "@reduxjs/toolkit";
import { getUser } from "./asyncUserAction.js";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        current: null,
        token: null,
        isLoading: false
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = action.payload.isLogin;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.isLogin = false;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
        });

        builder.addCase(getUser, (state, action) => {
            state.isLoading = false;
            state.current = null;
        });
    },
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;