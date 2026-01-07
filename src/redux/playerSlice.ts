
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Award = {
  id: number
  title: string,
  issuer: string,
  description: string
  dateReceived: string
}

interface RegisterPlayerArgs {
  data: FormData;
  token: string;
}

interface PlayerDetailsArgs {
  id: string;
  token: string;
}

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

export interface PlayerDetails {
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
    playerAddress: string,
    playerEmail: string,
    squadNumber: string,
    playerHeight: number,
    playerWeight: number,
    hasHealthConcern: boolean,
    healthConcernDescription: string,
    parentFirstname: string,
    parentMiddlename: string,
    parentLastname: string,
    parentAddress: string,
    parentPhone: string,
    parentEmail: string,
    parentTitle: string,
    sponsorFirstname: string,
    sponsorLastname: string,
    sponsorTitle: string,
    sponsorOccupation: string,
    sponsorPhone: string,
    sponsorEmail: string,
    regDate: string,
    admissionPhotoUrl: string,

    membershipStatus: string,

    awards: Award

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

export const fetchPlayerById = createAsyncThunk<
  ApiResponse<PlayerDetails>,
  PlayerDetailsArgs >("fetcher  player", async (params) => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/player/getplayerdetails/${params.id}`, {
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    });

    return res.data;
  })

export const fetchPlayers = createAsyncThunk<
  ApiResponse<Page<Player>>,
  string
>("users/fetch", async (token) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/player/getsummary`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log(res);
  return res.data;
});

export const registerPlayer = createAsyncThunk<
  ApiResponse<string>,      // return type
  RegisterPlayerArgs,                 // argument type
  { rejectValue: ApiResponse<string> }
>(
  "players/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/player/register`,
        formData.data,
        {
          headers: {
            Authorization: `Bearer ${formData.token}`
          }
        }
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
      console.log(action);
      state.loading = false;
      state.registerResponse = action.payload;
    })
      ;
  },
});

export default playerSlice.reducer;
