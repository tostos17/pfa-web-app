
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Award = {
  id: number
  title: string,
  issuer: string,
  description: string
  dateReceived: string
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

interface PlayerDetailsState {
  playerDetailsResponse: ApiResponse<PlayerDetails>;
  loading: boolean;
}


const initialState: PlayerDetailsState = {
   playerDetailsResponse: {
    code: 0,
    message: "",
    success: false,
    body: {
        id: 0,
  playerId: "string",
  passportPhotoUrl: "",

  firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    originState: "",
    nationality: "",
    playerPhone: "",
    playerAddress: "",
    playerEmail: "",
    squadNumber: "",
    playerHeight: 0,
    playerWeight: 0,
    hasHealthConcern: false,
    healthConcernDescription: "",
    parentFirstname: "",
    parentMiddlename: "",
    parentLastname: "",
    parentAddress: "",
    parentPhone: "",
    parentEmail: "",
    parentTitle: "",
    sponsorFirstname: "",
    sponsorLastname: "",
    sponsorTitle: "",
    sponsorOccupation: "",
    sponsorPhone: "",
    sponsorEmail: "",
    regDate: "",
    admissionPhotoUrl: "",

    membershipStatus: "",

    awards: {
        id: 0,
        issuer: "",
        title: "",
        description: "",
        dateReceived: ""
    }
    }
   }, 
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


const playerDetailsSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayerById.pending, (state) => { state.loading = true; })
      .addCase(fetchPlayerById.fulfilled, (state, action) => {
        state.loading = false;
        state.playerDetailsResponse = action.payload;
      })
      ;
  },
});

export default playerDetailsSlice.reducer;
