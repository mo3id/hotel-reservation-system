import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useRoom } from "@/hooks/useRoom";
import { cn } from "@/lib/utils";
import { differenceInDays, format, isBefore, startOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { toast } from "react-toastify";
import { createBooking } from "@/store/slices/bookingsSlice";

export default function RoomDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: room, isLoading, error } = useRoom(id!);
  const { loading } = useSelector((state: RootState) => state.bookings);
  const dispatch = useDispatch<AppDispatch>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error when fetching data</p>;
  if (!room) return <p>Room not found</p>;

  const canBook = !!(dateRange?.from && dateRange?.to);

  const totalDays =
    dateRange?.from && dateRange?.to
      ? differenceInDays(dateRange.to, dateRange.from)
      : 0;

  const totalPrice = totalDays * room.pricePerNight;

  const handleBook = async () => {
    if (!user) {
      toast.error("Please login to book a room!");
      navigate("/auth/signin");
      return;
    }

    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Please select valid dates.");
      return;
    }

    const days = differenceInDays(dateRange.to, dateRange.from);

    const totalPrice = room.pricePerNight * days;

    const booking = {
      id: Date.now(),
      userId: user.id,
      roomId: room.id,
      checkInDate: dateRange.from.toISOString().split("T")[0],
      checkOutDate: dateRange.to.toISOString().split("T")[0],
      totalPrice,
      status: "pending" as const,
    };

    const result = await dispatch(createBooking(booking));

    if (createBooking.fulfilled.match(result)) {
      toast.success("Room booked successfully! 🎉");
      navigate("/dashboard");
    } else {
      toast.error(
        typeof result.payload === "string"
          ? result.payload
          : "Booking failed ❌"
      );
    }
  };

  const today = startOfDay(new Date());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
      <div className="lg:col-span-2">
        <img
          src={room.image}
          alt={room.title}
          onError={(e) => (e.currentTarget.src = "/images/stayEase.png")}
          className="rounded-2xl w-full h-[400px] object-cover"
        />
        <div className="mt-4 space-y-3">
          <h2 className="text-2xl font-semibold">{room.title}</h2>
          <p className="text-muted-foreground">
            Room {room.roomNumber} • {room.hotelName}
          </p>
          <p className="text-sm leading-relaxed">{room.description}</p>
          <div className="font-medium text-lg">
            ${room.pricePerNight} / night
          </div>

          <div className="pt-3">
            <h3 className="font-semibold mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {room.amenities.map((item: string, i: number) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 bg-muted rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-2xl p-6 flex flex-col gap-5 h-fit">
        <h3 className="text-lg font-semibold">Book This Room</h3>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Dates</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Select dates</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className={cn(
                "w-64 p-0 bg-white",
                "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                "data-[side=bottom]:slide-in-from-top-2"
              )}
            >
              <div className="flex min-w-0 flex-col gap-2 w-full">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={1}
                  disabled={(date) => {
                    if (isBefore(startOfDay(date), today)) return true;
                    if (dateRange?.from && isBefore(date, dateRange.from))
                      return true;
                    return false;
                  }}
                  className="rounded-md border w-full mb-1 p-2"
                />
                <div className="text-muted-foreground text-center text-xs mb-2">
                  A minimum of 1 day is required
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {totalDays > 0 && (
          <div className="text-center text-sm font-medium text-blue-600">
            Total for {totalDays} {totalDays === 1 ? "night" : "nights"}: $
            {totalPrice}
          </div>
        )}

        <Button
          className={`mt-4 ${
            !room.isAvailable ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!canBook || loading || !room.isAvailable}
          onClick={() => {
            if (!room.isAvailable) return;    
            handleBook();
          }}
        >
          {!room.isAvailable
            ? "Room Not Available"
            : canBook
            ? " btm Now"
            : loading
            ? "Booking..."
            : "Select Dates to Book"}
        </Button>
      </div>
    </div>
  );
}
