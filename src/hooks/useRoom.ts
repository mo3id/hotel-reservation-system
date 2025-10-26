import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Room } from "@/types/types";

const fetchRoom = async (id: string) => {
  const response = await axios.get<Room>(`http://localhost:3005/rooms/${id}`);
  return response.data;
};

export const useRoom = (id: string) => {
  return useQuery({
    queryKey: ["room", id],
    queryFn: () => fetchRoom(id),
    enabled: !!id,
  });
};
