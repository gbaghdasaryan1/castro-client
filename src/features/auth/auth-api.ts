import { axiosInstance } from "@config/axios";

export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/auth/signin", data);
  return res.data as { token: string };
};


export const registerRequest = async (data: {
  lastName:string;
  firstName:string;
  email: string;
  password: string;
  role:string;
}) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data as { token: string };
};


export const verifyOTPRequest = async (
  data:{
    code:string,
    email:string
  } 
) => {
   const res = await axiosInstance.post("/auth/verify-otp", data);
  return res.data as { token: string };
}