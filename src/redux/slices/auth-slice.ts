import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuthState, IUser } from "@/types";

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setUser } = authSlice.actions;
