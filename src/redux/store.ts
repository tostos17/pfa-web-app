// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import playerDetailsReducer from './playerDetailsSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: { 
    players: playerReducer,
    playerById: playerDetailsReducer,
    user: userReducer
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
