import type { RegisterData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:3005/users";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const existing = await axios.get(`${API_URL}?email=${data.email}`);
      if (existing.data.length > 0) {
        throw new Error("Email already exists");
      }

      const res = await axios.post(API_URL, data);
      return res.data;
    },
  });
};
