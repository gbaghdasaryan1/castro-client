import { useMutation } from "@tanstack/react-query";
import { forgotPasswordRequest, loginRequest, registerRequest, resetPasswordRequest, verifyOTPRequest } from "./auth-api";

export const useLogin = () =>
  useMutation({ mutationFn: loginRequest });

export const useRegister = () =>
  useMutation({ mutationFn: registerRequest });

export const useOTPVerify = () => useMutation({mutationFn:verifyOTPRequest });

export const useForgotPassword = () => useMutation({ mutationFn: forgotPasswordRequest });

export const useResetPassword = () => useMutation({ mutationFn: resetPasswordRequest });