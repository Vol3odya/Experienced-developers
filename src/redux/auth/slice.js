import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { signin, logout, refreshUser, signup } from './operations.js';

const initialState = {
  user: {
    name: null,
    email: null,
    avatarUrl: null,
    daylyNorm: null,
    gender: true,
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isRefresh: false,
  isError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })

      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefresh = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefresh = false;
        state.isLoggedIn = true;
      })
      .addMatcher(isAnyOf(signup.pending, signin.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(signup.rejected, signin.rejected),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        }
      );
  },
});

export const  authReducer = authSlice.reducer;