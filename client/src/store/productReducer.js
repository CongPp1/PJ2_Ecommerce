import { createSlice } from "@reduxjs/toolkit";
import { getNewProducts } from "../store/asyncProductAction.js"


export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: null,
        errorMessage: ''
    },
    reducers: {
        logout: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNewProducts.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getNewProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newProducts = action.payload;
        });

        builder.addCase(getNewProducts, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
})

export const { } = productSlice.actions;
export default productSlice.reducer;