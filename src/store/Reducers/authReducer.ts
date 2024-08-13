import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info: { email: string; password: string }) => {
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
      console.log(data);
    } catch (error: any) {
      console.error(error.response.data);
    }
  }
);

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(admin_login.pending, (state, { payload }) => {
      state.loader = true;
    });
  },
});

export default authReducer.reducer;
