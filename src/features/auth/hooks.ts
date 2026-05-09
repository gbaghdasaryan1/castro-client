import { useMutation } from "@tanstack/react-query";
import { loginRequest, registerRequest, verifyOTPRequest } from "./auth-api";

export const useLogin = () =>
  useMutation({ mutationFn: loginRequest });


export const useRegister = () =>
  useMutation({ mutationFn: registerRequest });

export const useOTPVerify = () => useMutation({mutationFn:verifyOTPRequest })