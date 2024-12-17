import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = ""

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = ``;
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, thunkApi) => {
    try {
      const { data } = await axios.post('auth/signup', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.messege);
    }
  }
);

export const signin = createAsyncThunk(
  'auth/signin',
  async (credentials, thunkApi) => {
    try {
      const { data } = await axios.post('auth/signin', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.messege);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    await axios.post('/auth/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkApi.rejectWithValue(error.messege);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const reduxState = thunkApi.getState();
    setAuthHeader(reduxState.auth.token);
    try {
      const { data } = await axios.get('auth/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.messege);
    }
  },
  {
    condition: (_, thunkApi) => {
      const reduxState = thunkApi.getState();
      return reduxState.auth.token !== null;
    },
  }
);
