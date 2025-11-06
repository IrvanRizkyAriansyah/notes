"use client";
import { useMutation, useQueryClient } from "react-query";
import {
  loginUser,
  logoutUser,
  registerUser,
  LoginPayload,
  RegisterPayload,
  LoginResponse,
} from "../services/auth.service";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginPayload>(loginUser, {
    onSuccess: (data) => {
    
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));

    
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
}


export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, RegisterPayload>(registerUser, {
    onSuccess: (data) => {
    
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
}

/**
 * 🔹 Hook for user logout
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>(logoutUser, {
    onSuccess: () => {
    
      localStorage.removeItem("token");
      localStorage.removeItem("user");

    
      queryClient.removeQueries(["currentUser"]);
      queryClient.invalidateQueries(["notes"]);
    },
  });
}
