import type { LoginData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:3005/users";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await axios.get(
        `${API_URL}?email=${data.email}&password=${data.password}`
      );
      if (res.data.length === 0) {
        throw new Error("Invalid email or password");
      }
      return res.data[0];
    },
  });
};
