import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';

// Fuente principal
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
})