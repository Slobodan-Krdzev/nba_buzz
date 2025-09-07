import { Middleware } from "@reduxjs/toolkit";

export const sessionStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  if (state.cart) {
    sessionStorage.setItem("cart", JSON.stringify(state.cart.items));
  }
  return result;
};