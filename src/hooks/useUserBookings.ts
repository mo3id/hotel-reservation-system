import type { Booking, Room } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUserBookings = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["bookings", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data: bookings } = await axios.get<Booking[]>(
        `http://localhost:3005/bookings?userId=${userId}`
      );

      const roomRequests = bookings.map((b) =>
        axios.get<Room>(`http://localhost:3005/rooms/${b.roomId}`)
      );
      const roomResponses = await Promise.all(roomRequests);

      return bookings.map((b, i) => ({
        ...b,
        room: roomResponses[i].data,
      }));
    },
    enabled: !!userId,
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: number) => {
      const { data } = await axios.patch(
        `http://localhost:3005/bookings/${bookingId}`,
        { status: "canceled" }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
