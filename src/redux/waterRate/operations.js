import axios from 'axios';
import {createAsyncThunk} from "@reduxjs/toolkit";


// axios.defaults.baseURL = ...


export const fetchWaterRate = createAsyncThunk('waterRate/fetchWaterRate', async (_, thunkAPI) => {
    try {
        const response = await axios.get("/waterRate");
        return response.data.dailyNorma;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const putWaterRate = createAsyncThunk('waterRate/putWaterRate', async (dailyNorma, thunkAPI) => {
    try {
        const response = await axios.put('/waterRate', dailyNorma);
        return response.data.dailyNorma;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})