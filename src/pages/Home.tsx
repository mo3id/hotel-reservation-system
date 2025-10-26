import FilterCard from "@/components/Filter";
import { RoomCard } from "@/components/RoomCard";
import RoomsHeader from "@/components/RoomsHeader";
import { useState } from "react";
import { useRooms } from "@/hooks/useRooms";
import Pagination from "@/components/PaginationControls";
import type { Filters } from "@/types/types";

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 6;

  const {
    data = { rooms: [], totalCount: 0 },
    isLoading,
    error,
  } = useRooms(page, limit);

  const { rooms, totalCount } = data;

  const [sortBy, setSortBy] = useState<string>("priceLow");
  const [filters, setFilters] = useState<Filters>({
    roomType: "All",
    priceRange: [0, 500],
  });

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load rooms.</p>;

  const filteredRooms = rooms.filter((room) => {
    const matchesType =
      filters.roomType === "All" ||
      room.title.toLowerCase().includes(filters.roomType.toLowerCase());
    const matchesPrice =
      room.pricePerNight >= filters.priceRange[0] &&
      room.pricePerNight <= filters.priceRange[1];
    return matchesType && matchesPrice;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortBy === "priceLow") return a.pricePerNight - b.pricePerNight;
    if (sortBy === "priceHigh") return b.pricePerNight - a.pricePerNight;
    return 0;
  });

  return (
    <div>
      <div>
        <h1>Available Rooms</h1>
        <p>Find the perfect room for your stay</p>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-6">
        <div>
          <FilterCard onFilterChange={handleFilterChange} />
        </div>

        <div className="w-full">
          {sortedRooms.length > 0 && (
            <RoomsHeader
              totalRooms={sortedRooms.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRooms.length === 0 && <p>No rooms match your filters.</p>}
            {sortedRooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>

          {sortedRooms.length > 0 && (
            <Pagination
              currentPage={page}
              totalCount={totalCount}
              limit={limit}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
