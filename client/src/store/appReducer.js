import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../store/asyncAction.js"

const ab = getCategories();
console.log("================================",ab);
export const apSlice = createSlice({
    name: 'app',
    initialState: {
        categories: null,
        isLoading: false,
    },
    reducers: {
        logout: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        });

        builder.addCase(getCategories, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
})

export const { } = apSlice.actions;
export default apSlice.reducer;