import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/users/current");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  'user/updateUserAvatar',
  async (formdata, thunkAPI) => {
    try {
      const response = await axios.patch('/users/avatar', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (newdata, thunkAPI) => {
    try {
      const response = await axios.patch('/users/update', newdata);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
