"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./Slices/counterSlice";
import filtersReducer from "./Slices/filtersSlice";
import cartReducer from "./Slices/cartSlice";
import { sessionStorageMiddleware } from "./sessionStorageMiddleware";

const rootReducer = combineReducers({
  counter: counterReducer,
  filters: filtersReducer,
  cart: cartReducer,
});

// Hydrate cart from sessionStorage
const preloadedCart = typeof window !== "undefined"
  ? JSON.parse(sessionStorage.getItem("cart") || "[]")
  : [];

const preloadedState = {
  cart: { items: preloadedCart },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sessionStorageMiddleware),
});

// Correct types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;