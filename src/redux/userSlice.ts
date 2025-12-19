
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { ApiResponse } from "./playerSlice";

export interface AuthResponse {
    accessToken: string
}

export interface User {
  id: number;
  userId: string;
  username: string;
  roles: Set<string>
}

interface UserState {
  loginResponse: ApiResponse<AuthResponse>;
  loading: boolean;
}


const initialState: UserState = {
   loginResponse: {
    code: 0,
    message: "",
    success: false,
    body: {
        accessToken: ""
    }
   }, 
   loading: false 
};

export const doLogin = createAsyncThunk<
  ApiResponse<AuthResponse>,      // return type
  FormData,                 // argument type
  { rejectValue: ApiResponse<AuthResponse> }
>(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/auth/login`,
        formData,
        {
            headers: { "Content-Type": "application/json" }
        }
      );
      console.log("Login Response")
      console.log(res.data)
      return res.data as ApiResponse<AuthResponse>;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(doLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(doLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.loginResponse = action.payload;
      })
      .addCase(doLogin.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.loginResponse = action.payload;
        }
      });
  },
});


export default userSlice.reducer;
