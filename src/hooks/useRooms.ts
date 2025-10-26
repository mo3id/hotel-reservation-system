import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Room } from "@/types/types";

const fetchRooms = async (page: number, limit: number) => {
  const response = await axios.get<Room[]>(
    `http://localhost:3005/rooms?_page=${page}&_limit=${limit}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  const totalCountHeader =
    response.headers["x-total-count"] || response.headers["X-Total-Count"];

  let totalCount: number;

  if (totalCountHeader) {
    totalCount = parseInt(totalCountHeader, 10);
  } else {
    const allRooms = await axios.get<Room[]>(`http://localhost:3005/rooms`);
    totalCount = allRooms.data.length;
  }
  return { rooms: response.data, totalCount };
};

export const useRooms = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["rooms", page, limit],
    queryFn: () => fetchRooms(page, limit),
    placeholderData: (previousData) => previousData,
  });
};
