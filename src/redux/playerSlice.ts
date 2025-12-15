
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ApiResponse<T> {
  code: number;
  message: string;
  success: boolean;
  body: T;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}


export interface Player {
  id: number;
  playerId: string;
  passportPhotoUrl: string;

  firstname: string,
    middlename: string,
    lastname: string,
    dob: string,
    originState: string,
    nationality: string,
    playerPhone: string,
}

interface PlayerState {
  playerResponse: ApiResponse<Page<Player>>;
  registerResponse?: ApiResponse<string>;
  loading: boolean;
}


const initialState: PlayerState = {
   playerResponse: {
    code: 0,
    message: "",
    success: false,
    body: {
      content: [], 
    pageable: {
      pageNumber: 0, 
      pageSize: 0
    },
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false,
    numberOfElements: 0
    }
   }, 
   registerResponse: undefined,
   loading: false 
};

export const fetchPlayers = createAsyncThunk("users/fetch", async () => {
  const res = await axios.get("http://localhost:8135/pfa/player/getsummary");
  console.log(res);
  return res.data as ApiResponse<Page<Player>>;
});

export const registerPlayer = createAsyncThunk<
  ApiResponse<string>,      // return type
  FormData,                 // argument type
  { rejectValue: ApiResponse<string> }
>(
  "players/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:8135/pfa/player/register",
        formData
      );
      console.log(res.data)
      return res.data as ApiResponse<string>;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);


const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => { state.loading = true; })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.playerResponse = action.payload;
      })
      // .addCase(registerPlayer.fulfilled, (state, action) => {
      //   state.playerResponse.body.content.unshift(action.payload.body);
      // })
      .addCase(registerPlayer.pending, (state) => {
      state.loading = true;
      state.registerResponse = undefined;
    })
    .addCase(registerPlayer.fulfilled, (state, action) => {
      console.log("fulfilled");
      console.log(action.payload)
      state.loading = false;
      state.registerResponse = action.payload;
      console.log("state has now changed");
      console.log(state.registerResponse)
    })
    .addCase(registerPlayer.rejected, (state, action) => {
      state.loading = false;
      state.registerResponse = action.payload;
    })
      ;
  },
});

export default playerSlice.reducer;
