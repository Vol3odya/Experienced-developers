import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://experienced-developers-nodetwo.onrender.com';

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
      setAuthHeader(data.data.accessToken);
      return {
        ...data.data,
        accessToken: data.data.accessToken,
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
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    const response = await axios.post('/auth/logout');

    if (response.status === 204) {
      clearAuthHeader();
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const reduxState = thunkApi.getState();
    setAuthHeader(reduxState.auth.token);
  try {
      const { data } = await axios.get('users/current');
      return {
        user: { ...data.data },
        accessToken: data.data.accessToken,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const reduxState = thunkApi.getState();
      return reduxState.auth.token !== null;
    },
  }
);
