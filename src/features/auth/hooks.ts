import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "./auth-api";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
  });
};