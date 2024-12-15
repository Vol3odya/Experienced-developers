import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//axios.defaults.baseURL =....

export const getWaterFromToday = createAsyncThunk(
  "today/getWater",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/today");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
