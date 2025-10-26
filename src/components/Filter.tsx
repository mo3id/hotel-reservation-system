import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Filters {
  roomType: string;
  priceRange: [number, number];
}

interface FilterCardProps {
  onFilterChange: (filters: Filters) => void;
}

const Filters = ({ onFilterChange }: FilterCardProps) => {
  const [roomType, setRoomType] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const handleReset = () => {
    setRoomType("All");
    setPriceRange([0, 500]);
    onFilterChange({ roomType: "All", priceRange: [0, 500] });
  };

  const handleRoomTypeChange = (type: string) => {
    setRoomType(type);
    onFilterChange({ roomType: type, priceRange });
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
    onFilterChange({ roomType, priceRange: range });
  };
  return (
    <Card className="p-6 space-y-2 md:w-64">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="outline" size="sm" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div>
        <Label className="font-medium">Room Type</Label>
        <div className="flex flex-col gap-2 mt-2">
          {["All", "Single", "Double", "Suite", "Deluxe"].map((type) => (
            <label
              key={type}
              className="flex text-sm font-semibold cursor-pointer w-fit items-center gap-2"
            >
              <input
                type="radio"
                name="roomType"
                value={type}
                checked={roomType === type}
                onChange={() => handleRoomTypeChange(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Label className="font-medium">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Label>
        <div className="mt-3">
          <Slider
            value={priceRange}
            onValueChange={(value) =>
              handlePriceChange(value as [number, number])
            }
            min={0}
            max={500}
            step={10}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Filters;
