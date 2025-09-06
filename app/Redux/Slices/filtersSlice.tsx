import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  selectedCollection: string;
  selectedCategorie: string;
  priceRange: { min: number; max: number };
  selectedSizes: string[];
}

const initialState: FiltersState = {
  selectedCollection: "all",
  selectedCategorie: "",
  priceRange: { min: 10, max: 100 },
  selectedSizes: [],
};

const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState,
  reducers: {
    setSelectedCollection(state, action: PayloadAction<string>) {
      state.selectedCollection = action.payload;
    },
    setSelectedCategorie(state, action: PayloadAction<string>) {
      state.selectedCategorie = action.payload;
    },
    setPriceRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.priceRange = { min: action.payload.min, max: action.payload.max };
    },
    addSize(state, action: PayloadAction<string>) {
      state.selectedSizes.push(action.payload);
    },
    removeSize(state, action: PayloadAction<string>) {
      state.selectedSizes = state.selectedSizes.filter(
        (s) => s !== action.payload
      );
    },
    clearFilters: () => initialState,
  },
});

export const { setSelectedCollection, setSelectedCategorie, setPriceRange, addSize, removeSize,clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
