import { Product } from "@/app/Types/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  favouriteItems: Product[];
}

const initialState: CounterState = {
  value: 1,
  favouriteItems: [],
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    clearCounter(state) {
      state.value = 1;
    },
    setValue(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
    addFaveItem(state, action: PayloadAction<Product>) {
      if (!state.favouriteItems.find((i) => i._id === action.payload._id)) {
        state.favouriteItems.push(action.payload);
      }
    },
    removeFaveItem(state, action: PayloadAction<Product>) {
      state.favouriteItems = state.favouriteItems.filter(
        (i) => i._id !== action.payload._id
      );
    },
    clearFaveItems(state) {
      state.favouriteItems = [];
    },
  },
});

export const {
  clearCounter,
  increment,
  decrement,
  setValue,
  addFaveItem,
  removeFaveItem,
  clearFaveItems,
} = counterSlice.actions;

export default counterSlice.reducer;
