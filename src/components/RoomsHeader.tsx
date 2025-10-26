import type { FC } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface RoomsHeaderProps {
  totalRooms: number;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const RoomsHeader: FC<RoomsHeaderProps> = ({
  totalRooms,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
      <h2 className="text-lg font-semibold text-gray-800">
        {totalRooms} rooms found
      </h2>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="priceLow">Price: Low to High</SelectItem>
            <SelectItem value="priceHigh">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RoomsHeader;
