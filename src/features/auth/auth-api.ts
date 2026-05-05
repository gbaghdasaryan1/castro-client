import { axiosInstance } from "@config/axios";

 
export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data; // { token, user }
};