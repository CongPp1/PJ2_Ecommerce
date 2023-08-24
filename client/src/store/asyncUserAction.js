import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetUser } from "../APIs/user";

export const getUser = createAsyncThunk('user/user', async (data, { rejectWithValue }) => {
    console.log('nnnn')
    const payload = await apiGetUser();
    console.log('payload', payload);

    if (payload.message === 'User fetched successfully') {
        return payload.result;
    } else {
        return rejectWithValue(payload)
    }
});