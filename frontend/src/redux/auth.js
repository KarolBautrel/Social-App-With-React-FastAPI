import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: "",
    email: "",
    token: "",
    id: "",
  },
  reducers: {
    getLoggedUserData: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    clearUserData: (state) => {
      state.username = "";
      state.email = "";
      state.token = "";
      state.id = "";
    },
  },
});
export const { getLoggedUserData, clearUserData } = authSlice.actions;

export default authSlice.reducer;
