import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = "https://tracker-of-water-xk7t.onrender.com/"

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/user');
        return response.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


export const updateUserAvatar = createAsyncThunk('user/updateUserAvatar', async(formdata, thunkAPI) => {
    try {
        const response = await axios.patch('/user/avatar', formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
              },
        });
        return response.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const updateUser = createAsyncThunk('user/updateUser', async (newdata, thunkAPI) => {
    try {
        const response = await axios.patch('/user', newdata);
        return response.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})
