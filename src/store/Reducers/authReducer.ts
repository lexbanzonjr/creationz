import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (
    info: { email: string; password: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error: any) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
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
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.fulfilled, (state, action: any) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(admin_login.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(admin_login.rejected, (state, action: any) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      });
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
