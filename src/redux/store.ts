// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: { 
    players: playerReducer,
    user: userReducer
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
