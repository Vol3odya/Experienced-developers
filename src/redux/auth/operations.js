import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"

axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = ``;
};

export const register = createAsyncThunk("auth/register", async (credentials, thunkApi) => {
    try {
        const { data } = await axios.post("users/signup", credentials);
        setAuthHeader(data.token);
        return data;
        
    } catch (error) {
        return thunkApi.rejectWithValue(error.messege);
    }
});

export const logIn = createAsyncThunk("auth/login", async (credentials, thunkApi) => {
    try {
        const { data } = await axios.post("users/login", credentials);
        setAuthHeader(data.token);
        return data;
        
    } catch (error) {
        return thunkApi.rejectWithValue(error.messege);
    }
});

export const logOut = createAsyncThunk("auth/logout", async (_, thunkApi) => {
    try {
        const { data } = await axios.post("users/logout");  
        clearAuthHeader();
    } catch (error) {
        return thunkApi.rejectWithValue(error.messege);
    }
});

export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkApi) => {
    const reduxState = thunkApi.getState();
    setAuthHeader(reduxState.auth.token);
    try {
        const { data } = await axios.get("/users/current");  
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.messege);
    }
}, {
    condition: (_, thunkApi) => {
        const reduxState = thunkApi.getState();
        return reduxState.auth.token !== null;
    }
}
    );