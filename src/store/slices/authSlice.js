import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setError } = authSlice.actions;
export default authSlice.reducer;
