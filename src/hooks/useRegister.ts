import type { RegisterData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BIN_URL = "https://api.jsonbin.io/v3/b/68fe2b7943b1c97be9824fce";

const MASTER_KEY = import.meta.env.VITE_JSONBIN_KEY;

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      console.log("MASTER_KEY:", MASTER_KEY);

      const res = await axios.get(BIN_URL, {
        headers: {
          "X-Master-Key": MASTER_KEY,
        },
      });

      const existingData = res.data.record;
      const users = existingData.users || [];

      if (users.some((u: RegisterData) => u.email === data.email)) {
        throw new Error("Email already exists");
      }

      const updated = {
        ...existingData,
        users: [...users, data],
      };

      const updateRes = await axios.put(BIN_URL, updated, {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
      });

      return updateRes.data;
    },
  });
};
