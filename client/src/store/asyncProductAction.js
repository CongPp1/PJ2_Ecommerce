import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetProducts } from "../APIs/product";

export const getNewProducts = createAsyncThunk('product/newProducts', async (data, { rejectWithValue }) => {
    const payload = await apiGetProducts({ sort: '-sold' });

    if (payload.message === 'Get all products successfully') {
        console.log('aaaa: ',payload.data.products);
        return payload.data.products;
    } else {
        return rejectWithValue(payload)
    }
});