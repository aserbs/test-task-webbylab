import type { LoginForm } from "@/pages/Login";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface IResponseUserCreate {
  token: string;
  status: number;
  error: {
    fields: object;
    code: string;
  };
}

export const fetchUserCreate = async (data: LoginForm) => {
  const res = await axios.post<IResponseUserCreate>(`${API_URL}/users`, data);
  return res?.data;
};
