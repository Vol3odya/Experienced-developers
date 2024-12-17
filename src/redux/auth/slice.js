import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  signin,
  logout,
  refreshUser,
  signup,
  updateProfile,
} from "./operations";

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
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
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
      .addCase(refreshUser.rejected, () => {})
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }; // Обновляем данные пользователя
        state.isLoading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addMatcher(isAnyOf(/*register.pending,*/ signin.pending), (state) => {
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

export default authSlice.reducer;
