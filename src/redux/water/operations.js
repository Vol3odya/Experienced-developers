import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = ...

export const addWater = createAsyncThunk('water/addWater', async({waterVolume, date}, thunkAPI) => {
    try {
        const response = await axios.post('/water', {date, waterVolume});
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const updateWater = createAsyncThunk('water/updateWater', async({waterVolume, date, id}, thunkAPI) => {
    try {
        const response = await axios.patch(`/water/${id}`, {date, waterVolume});
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
});

export const deleteWater = createAsyncThunk('water/deleteWater', async({id}, thunkAPI) => {
    try {
        const response = await axios.delete(`/water/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})