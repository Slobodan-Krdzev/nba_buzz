import { Product } from "@/app/Types/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  product: Product;
  qty: number;
  checked: boolean;
  color: string;
  size: string;
  lineId?: string;
};

type CartState = {
  items: CartItem[];
  couponCode?: string;
  discountAmount?: number;
};

const initialState: CartState = {
  items: [],
  couponCode: undefined,
  discountAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload.map((it) => ({
        ...it,
        lineId: it.lineId || `${it.product._id}:${it.size}:${it.color}`,
      }));
    },
    addToCart(
      state,
      action: PayloadAction<{ product: Product; qty?: number, color: string, size: string }>
    ) {
      const { product, qty = 1, color, size } = action.payload;
      const lineId = `${product._id}:${size}:${color}`;
      const existing = state.items.find(
        (item) => (item.lineId || `${item.product._id}:${item.size}:${item.color}`) === lineId
      );
      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({ product, qty, checked: true, color, size, lineId });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const lineId = action.payload;
      state.items = state.items.filter(
        (item) => (item.lineId || `${item.product._id}:${item.size}:${item.color}`) !== lineId
      );
    },
    updateQty(state, action: PayloadAction<{ lineId: string; qty: number }>) {
      const item = state.items.find(
        (item) => (item.lineId || `${item.product._id}:${item.size}:${item.color}`) === action.payload.lineId
      );
      if (item) {
        item.qty = Math.max(1, action.payload.qty);
      }
    },
    toggleCheck(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (item) => (item.lineId || `${item.product._id}:${item.size}:${item.color}`) === action.payload
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
    applyCoupon(state, action: PayloadAction<{ code: string; discountAmount: number }>) {
      state.couponCode = action.payload.code;
      state.discountAmount = action.payload.discountAmount;
    },
    clearCoupon(state) {
      state.couponCode = undefined;
      state.discountAmount = 0;
    },
    clearCart(state) {
      state.items = [];
      state.couponCode = undefined;
      state.discountAmount = 0;
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
  applyCoupon,
  clearCoupon,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
