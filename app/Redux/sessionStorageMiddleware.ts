import { Middleware } from "@reduxjs/toolkit";

export const sessionStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  if (state.cart) {
    sessionStorage.setItem("cartState", JSON.stringify(state.cart));
  }
  if (state.counter) {
    sessionStorage.setItem("favourites", JSON.stringify(state.counter.favouriteItems));
  }
  if (state.user) {
    sessionStorage.setItem("currentUser", JSON.stringify(state.user.currentUser));
    sessionStorage.setItem("authToken", JSON.stringify(state.user.token));
  }
  return result;
};