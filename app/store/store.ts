import { configureStore, combineReducers } from '@reduxjs/toolkit';
import chatSlice from './chatSlice';

const rootReducer = combineReducers({
  chatSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
