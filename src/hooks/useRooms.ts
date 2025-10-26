import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Room } from "@/types/types";

const BIN_URL = "https://api.jsonbin.io/v3/b/68fe2b7943b1c97be9824fce";

const MASTER_KEY = import.meta.env.VITE_JSONBIN_KEY;

const fetchRooms = async (page: number, limit: number) => {
  console.log("MASTER_KEY:", MASTER_KEY);
  const res = await axios.get(BIN_URL, {
    headers: {
      "X-Master-Key": MASTER_KEY,
    },
  });

  const record = res.data.record;
  const rooms: Room[] = record.rooms || [];

  const totalCount = rooms.length;

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedRooms = rooms.slice(start, end);

  return { rooms: paginatedRooms, totalCount };
};

export const useRooms = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["rooms", page, limit],
    queryFn: () => fetchRooms(page, limit),
    placeholderData: (previousData) => previousData,
  });
};
