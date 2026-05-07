import axios from "axios";
import { axiosInstance } from "@config/axios";

export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data; // { token, user }
};

export const googleLoginRequest = async (credential: string) => {
  const res = await axiosInstance.post("/api/auth/google", { credential });
  return res.data as { accessToken: string };
};