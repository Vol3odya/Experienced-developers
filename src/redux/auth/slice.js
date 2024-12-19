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
        state.user = action.payload;
        state.avatarUrl = action.payload.photo;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = null;
      })

      .addCase(signin.fulfilled, (state, action) => {
        state.isRefresh = true;
        state.token = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefresh = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.isRefresh = false;
        state.isLoggedIn = true;
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
        }
      );
  },
});

export const authReducer = authSlice.reducer;
