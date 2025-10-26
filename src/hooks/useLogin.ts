import type { LoginData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BIN_URL = "https://api.jsonbin.io/v3/b/68fe2b7943b1c97be9824fce";

const MASTER_KEY = import.meta.env.VITE_JSONBIN_KEY;

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      console.log("MASTER_KEY:", MASTER_KEY);

      const res = await axios.get(BIN_URL, {
        headers: {
          "X-Master-Key": MASTER_KEY,
        },
      });

      const record = res.data.record;
      const users = record.users || [];

      const user = users.find(
        (u: LoginData) => u.email === data.email && u.password === data.password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      return user;
    },
  });
};
