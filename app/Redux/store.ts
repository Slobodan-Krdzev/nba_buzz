"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./Slices/counterSlice";
import filtersReducer from "./Slices/filtersSlice";
import cartReducer from "./Slices/cartSlice";
import userReducer from "./Slices/userSlice";
import { sessionStorageMiddleware } from "./sessionStorageMiddleware";

const rootReducer = combineReducers({
  counter: counterReducer,
  filters: filtersReducer,
  cart: cartReducer,
  user: userReducer,
});

// Hydrate from sessionStorage
const preloadedCart = typeof window !== "undefined"
  ? JSON.parse(sessionStorage.getItem("cart") || "[]")
  : [];
const preloadedFavourites = typeof window !== "undefined"
  ? JSON.parse(sessionStorage.getItem("favourites") || "[]")
  : [];
const preloadedUser = typeof window !== "undefined"
  ? JSON.parse(sessionStorage.getItem("currentUser") || "null")
  : null;
const preloadedToken = typeof window !== "undefined"
  ? JSON.parse(sessionStorage.getItem("authToken") || "null")
  : null;

const preloadedState = {
  cart: { items: preloadedCart },
  counter: { value: 1, favouriteItems: preloadedFavourites },
  user: { currentUser: preloadedUser, token: preloadedToken, isAuthenticated: Boolean(preloadedUser || preloadedToken) },
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