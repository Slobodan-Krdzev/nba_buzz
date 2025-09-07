import { Product } from "@/app/Types/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  product: Product;
  qty: number;
  checked: boolean;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addToCart(
      state,
      action: PayloadAction<{ product: Product; qty?: number }>
    ) {
      const { product, qty = 1 } = action.payload;
      const existing = state.items.find(
        (item) => item.product._id === product._id
      );
      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({ product, qty, checked: true });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );
    },
    updateQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      const item = state.items.find(
        (item) => item.product._id === action.payload.id
      );
      if (item) {
        item.qty = Math.max(1, action.payload.qty);
      }
    },
    toggleCheck(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (item) => item.product._id === action.payload
      );
      if (item) {
        item.checked = !item.checked;
      }
    },
    selectAll(state, action: PayloadAction<boolean>) {
      state.items.forEach((item) => (item.checked = action.payload));
    },
    removeChecked(state) {
      state.items = state.items.filter((item) => !item.checked);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  updateQty,
  toggleCheck,
  selectAll,
  removeChecked,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
