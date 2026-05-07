import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "./auth-api";

export const useLogin = () =>
  useMutation({ mutationFn: loginRequest });
