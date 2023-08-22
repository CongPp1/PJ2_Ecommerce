import { createSlice, current } from "@reduxjs/toolkit";
import { getCategories } from "../store/asyncAction.js"

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        current: null,
        token: null
    },
    reducers: {
        register: (state, action) => {
            console.log('action', action)
            state.isLogin = action.payload.isLogin;
            state.current = action.payload.userData;
            state.token = action.payload.token;
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getCategories.pending, (state) => {
    //         state.isLoading = true;
    //     });

    //     builder.addCase(getCategories.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.categories = action.payload;
    //     });

    //     builder.addCase(getCategories, (state, action) => {
    //         state.isLoading = false;
    //         state.errorMessage = action.payload.message;
    //     });
    // },
})

export const { register } = userSlice.actions;
export default userSlice.reducer;