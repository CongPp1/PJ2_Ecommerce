import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCategories } from "../APIs/app";

export const getCategories = createAsyncThunk('app/category', async(data, {rejectWithValue}) => {
    const payload = await apiGetCategories();
    console.log('payload',payload);

    if (payload.message === 'Success') {
        console.log('aa');
        console.log('reducer',payload.ProductCategories);
        return payload.ProductCategories;
    } else {
        return rejectWithValue(payload)
    }
});