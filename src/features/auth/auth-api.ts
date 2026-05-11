import { axiosInstance } from "@config/axios";
import {
  AuthTokenResponse,
  LoginFormData,
  RegistrationFormData,
  VerifyOTPData,
} from "./types";

export const loginRequest = (data: LoginFormData): Promise<AuthTokenResponse> =>
  axiosInstance.post<AuthTokenResponse, LoginFormData>("/auth/signin", data);

export const registerRequest = (data: RegistrationFormData): Promise<AuthTokenResponse> =>
  axiosInstance.post<AuthTokenResponse, RegistrationFormData>("/auth/signup", data);

export const verifyOTPRequest = (data: VerifyOTPData): Promise<AuthTokenResponse> => 
  axiosInstance.post<AuthTokenResponse, VerifyOTPData>("/auth/verify-otp", data);
