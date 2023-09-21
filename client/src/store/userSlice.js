import { createSlice, current } from "@reduxjs/toolkit";
import { getUser, updateUser, deleteUser } from "./asyncUserAction.js";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        current: null,
        token: null,
        isLoading: false,
        mes: ''
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = action.payload.isLogin;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.isLogin = false;
            state.token = null;
            state.current = null;
            state.isLoading = false;
            state.mes = '';
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
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
        });

        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.mes = action.error.message;
        });
        builder.addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = null;
        });

        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.mes = action.error.message;
        });
    },
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;