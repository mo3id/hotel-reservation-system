import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Room } from "@/types/types";

const BIN_URL = "https://api.jsonbin.io/v3/b/68fe2b7943b1c97be9824fce";

const MASTER_KEY = import.meta.env.VITE_JSONBIN_KEY;

const fetchRoom = async (id: string): Promise<Room | null> => {
  console.log("MASTER_KEY:", MASTER_KEY);

  const res = await axios.get(BIN_URL, {
    headers: {
      "X-Master-Key": MASTER_KEY,
    },
  });

  const record = res.data.record;
  const rooms: Room[] = record.rooms || [];

  const room = rooms.find((r) => String(r.id) === String(id)) || null;

  return room;
};

export const useRoom = (id: string) => {
  return useQuery({
    queryKey: ["room", id],
    queryFn: () => fetchRoom(id),
    enabled: !!id,
  });
};
