import { axiosInstance } from "@config/axios";
import {
  AuthTokenResponse,
  ForgotPasswordBody,
  ForgotPasswordResponse,
  LoginFormData,
  RegistrationFormData,
  ResetPasswordRequestData,
  ResetPasswordResponse,
  VerifyOTPData,
} from "./types";

export const loginRequest = (data: LoginFormData): Promise<AuthTokenResponse> =>
  axiosInstance.post<AuthTokenResponse, LoginFormData>("/auth/signin", data);

export const registerRequest = (data: RegistrationFormData): Promise<AuthTokenResponse> =>
  axiosInstance.post<AuthTokenResponse, RegistrationFormData>("/auth/signup", data);

export const verifyOTPRequest = (data: VerifyOTPData): Promise<AuthTokenResponse> => 
  axiosInstance.post<AuthTokenResponse, VerifyOTPData>("/auth/verify-otp", data);

export const forgotPasswordRequest = (email: string): Promise<ForgotPasswordResponse> =>
  axiosInstance.post<ForgotPasswordResponse, ForgotPasswordBody>("/auth/forgot-password", { email });

export const resetPasswordRequest = (data: ResetPasswordRequestData): Promise<ResetPasswordResponse> =>
  axiosInstance.post<ResetPasswordResponse,ResetPasswordRequestData>("/auth/reset-password", data);