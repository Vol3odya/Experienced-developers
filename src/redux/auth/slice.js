import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { signin, logout, refreshUser, signup } from './operations';

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
        state.avatarUrl = action.payload.photo;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = null;
      })

      .addCase(signin.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        state.isRefresh = false;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(signin.pending, (state) => {
        state.isRefresh = true;
      })
  
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = action.payload;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefresh = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isRefresh = false;
        state.isLoggedIn = true;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefresh = false;
        state.isError = action.payload;
      })
      .addMatcher(isAnyOf(signup.pending, signin.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(signup.rejected, signin.rejected),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
          state.isRefresh = false;
        }
      );
  },
});

export default authSlice.reducer;
