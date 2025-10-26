import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users } from "lucide-react";
import Link from "./link";

type RoomCardProps = {
  id: number;
  roomNumber: number;
  title: string;
  hotelName: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  isAvailable: boolean;
  image: string;
};

export const RoomCard: React.FC<RoomCardProps> = ({
  id,
  title,
  hotelName,
  pricePerNight,
  capacity,
  amenities,
  isAvailable,
  image,
  roomNumber,
}) => {
  const extraAmenities =
    amenities.length > 3 ? amenities.slice(0, 3) : amenities;
  const remaining = amenities.length - 3;

  return (
    <Card className="w-full sm:w-full max-w-sm overflow-hidden shadow-sm border gap-3 border-gray-200 rounded-2xl py-0">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/images/stayEase.png"}
          onError={(e) => (e.currentTarget.src = "/images/stayEase.png")}
          alt={title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-white/90 text-sm px-2 py-1 rounded-md font-semibold">
          {roomNumber}
        </div>
        <Badge
          variant="secondary"
          className={`absolute top-2 right-2 ${
            isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {isAvailable ? "Available" : "Not Available"}
        </Badge>
      </div>

      <CardContent className="p-4 space-y-3 flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-700 font-medium">
            ${pricePerNight}
            <span className="text-sm text-gray-500">/night</span>
          </p>
        </div>

        <div className="flex items-center text-gray-500 text-sm gap-1">
          <MapPin size={14} />
          {hotelName}
        </div>

        <div className="flex items-center text-gray-500 text-sm gap-1">
          <Users size={14} /> Up to {capacity} guest{capacity > 1 ? "s" : ""}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {extraAmenities.map((a, i) => (
            <Badge
              key={i}
              variant="outline"
              className="text-gray-700 border-gray-300"
            >
              {a}
            </Badge>
          ))}
          {remaining > 0 && (
            <Badge variant="outline" className="border-gray-300 text-gray-500">
              +{remaining}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Link to={`/rooms/${id}`} className="w-full">
          <Button
            className={`w-full ${
              isAvailable
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-400"
            }`}
            disabled={!isAvailable}
          >
            {isAvailable ? "View Details" : "Not Available"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
