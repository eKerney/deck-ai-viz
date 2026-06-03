import { configureStore, combineReducers } from '@reduxjs/toolkit';
import dataSlice from './slices/dataSlice';
import chatSlice from './slices/chatSlice';

const rootReducer = combineReducers({
  dataSlice,
  chatSlice
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
