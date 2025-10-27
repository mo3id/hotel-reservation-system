import type { Booking, BookingState } from "@/types/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

const BIN_URL = "https://api.jsonbin.io/v3/b/68fe2b7943b1c97be9824fce";
const MASTER_KEY = import.meta.env.VITE_JSONBIN_KEY;

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData: Booking, { rejectWithValue }) => {
    try {
      const res = await axios.get(BIN_URL, {
        headers: { "X-Master-Key": MASTER_KEY },
      });

      const record = res.data.record;
      const bookings: Booking[] = record.bookings || [];

      const newBooking: Booking = {
        ...bookingData,
        id: bookings.length ? bookings[bookings.length - 1].id + 1 : 1,
      };

      const updatedBookings = [...bookings, newBooking];

      await axios.put(
        BIN_URL,
        { ...record, bookings: updatedBookings },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": MASTER_KEY,
          },
        }
      );

      return newBooking;
    } catch (err: Error | unknown) {
      const error = err as Error;
      return rejectWithValue(error.message || "Failed to create booking");
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createBooking.fulfilled,
        (state, action: PayloadAction<Booking>) => {
          state.loading = false;
          state.bookings.push(action.payload);
        }
      )
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookingsSlice.reducer;
