import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetUser } from "../APIs/user";

export const getUser = createAsyncThunk('user/user', async (data, { rejectWithValue }) => {
    const payload = await apiGetUser();

    if (payload.message === 'User fetched successfully') {
        return payload.result;
    } else {    
        return rejectWithValue(payload)
    }
});