import type { Booking, Room } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BIN_URL = "https://api.jsonbin.io/v3/b/68fe2b7943b1c97be9824fce";

const MASTER_KEY = import.meta.env.VITE_JSONBIN_KEY;

export const useUserBookings = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["bookings", userId],
    queryFn: async () => {
      if (!userId) return [];

      const res = await axios.get(BIN_URL, {
        headers: { "X-Master-Key": MASTER_KEY },
      });

      const record = res.data.record;
      const bookings: Booking[] = record.bookings || [];
      const rooms: Room[] = record.rooms || [];

      const userBookings = bookings.filter((b) => b.userId === userId);

      return userBookings.map((b) => ({
        ...b,
        room: rooms.find((r) => r.id === b.roomId),
      }));
    },
    enabled: !!userId,
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: number) => {
      const res = await axios.get(BIN_URL, {
        headers: { "X-Master-Key": MASTER_KEY },
      });

      const record = res.data.record;
      const bookings: Booking[] = record.bookings || [];

      const updatedBookings = bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "canceled" } : b
      );

      const updateRes = await axios.put(
        BIN_URL,
        { ...record, bookings: updatedBookings },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": MASTER_KEY,
          },
        }
      );

      return updateRes.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
