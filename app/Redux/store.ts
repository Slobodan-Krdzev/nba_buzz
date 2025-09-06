"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./Slices/counterSlice";
import filtersReducer from "./Slices/filtersSlice";


const rootReducer = combineReducers({
  counter: counterReducer,
  filters: filtersReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Correct types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;