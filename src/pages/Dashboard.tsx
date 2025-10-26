import { useSelector } from "react-redux";
import { useCancelBooking, useUserBookings } from "@/hooks/useUserBookings";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/store";

export default function Dashboard() {
  const cancelBooking = useCancelBooking();

  const handleCancel = (bookingId: number) => {
    cancelBooking.mutate(bookingId);
  };

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;

  const { data: bookings, isLoading, error } = useUserBookings(userId);

  if (isLoading) return <p>Loading bookings...</p>;
  if (error) return <p>Failed to fetch bookings</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

      {bookings && bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              className={`overflow-hidden relative py-0 ${
                booking.status === "canceled" ? "opacity-70" : ""
              }`}
            >
              <div className="absolute top-3 right-3 z-10">
                <Badge
                  className={`px-3 py-1 text-sm capitalize ${
                    booking.status === "confirmed"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {booking.status}
                </Badge>
              </div>

              <img
                src={booking.room.image}
                alt={booking.room.title}
                className="w-full h-40 object-cover"
                onError={(e) => (e.currentTarget.src = "/images/stayEase.png")}
              />
              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{booking.room.title}</h3>
                <p className="text-sm text-gray-500">
                  {booking.room.hotelName}
                </p>
                <p className="text-sm">
                  {booking.checkInDate} → {booking.checkOutDate}
                </p>
                <p className="font-medium">${booking.totalPrice}</p>
              </CardContent>
              <CardFooter className="p-0">
                <Button
                  variant="destructive"
                  className="w-full rounded-none"
                  onClick={() => handleCancel(booking.id!)}
                  disabled={
                    cancelBooking.isPending || booking.status === "canceled"
                  }
                >
                  {booking.status === "canceled"
                    ? "Booking Canceled"
                    : cancelBooking.isPending
                    ? "Cancelling..."
                    : "Cancel Booking"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
}
