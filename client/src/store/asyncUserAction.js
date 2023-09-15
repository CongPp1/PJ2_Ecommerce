import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetUser, apiUpdateUser, apiDeleteUser } from "../APIs/user";

export const getUser = createAsyncThunk('user/user', async (data, { rejectWithValue }) => {
    const payload = await apiGetUser();

    if (payload.message === 'User fetched successfully') {
        return payload.result;
    } else {
        return rejectWithValue(payload)
    }
});

export const updateUser = createAsyncThunk('user/update', async ({ userId, data }, { rejectWithValue }) => {
    const payload = await apiUpdateUser(data, userId);

    if (payload.message === 'User updated successfully') {
        return payload.result;
    } else {
        return rejectWithValue(payload)
    }
});

export const deleteUser = createAsyncThunk('user/delete', async (userId, { rejectWithValue }) => {
    const payload = await apiDeleteUser(userId);

    if (payload.message === 'User deleted successfully') {
        return payload.result;
    } else {
        return rejectWithValue(payload)
    }
})