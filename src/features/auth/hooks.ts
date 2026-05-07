import { useMutation } from "@tanstack/react-query";
import { loginRequest, googleLoginRequest } from "./auth-api";

export const useLogin = () =>
  useMutation({ mutationFn: loginRequest });

export const useGoogleLogin = () =>
  useMutation({ mutationFn: googleLoginRequest });