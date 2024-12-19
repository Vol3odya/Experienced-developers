import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://tracker-of-water-xk7t.onrender.com/';

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
      return {
        ...data.data.data,
        photo: data.data.photo,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const signin = createAsyncThunk(
  'auth/signin',
  async (credentials, thunkApi) => {
    try {
      const { data } = await axios.post(
        'auth/signin',
        credentials
        // {
        // withCredentials: true,
        // }
      );
      // console.log(data);

      setAuthHeader(data.data.accessToken);
      return data.data.accessToken;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    const response = await axios.post('/auth/logout');
    console.log(response.status);

    if (response.status === 204) {
      clearAuthHeader();
    }
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
      const { data } = await axios.get('auth/refreshSession');
      return data.data.accessToken;
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
