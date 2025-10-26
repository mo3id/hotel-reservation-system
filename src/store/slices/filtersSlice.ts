// src/redux/filterSlice.ts
import type { FiltersState } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: FiltersState = {
  roomType: "All",
  priceRange: [0, 500],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setRoomType: (state, action: PayloadAction<string>) => {
      state.roomType = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    resetFilters: (state) => {
      state.roomType = "All";
      state.priceRange = [0, 500];
    },
  },
});

export const { setRoomType, setPriceRange, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
