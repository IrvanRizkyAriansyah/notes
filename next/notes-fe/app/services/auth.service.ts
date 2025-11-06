// src/services/auth.service.ts
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { getCookie } from "cookies-next";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const { data } = await axios.post<LoginResponse>(`${API_URL}/api/auth/login`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

export async function logoutUser(): Promise<void> {
    const token = getCookie('token')
  try {
    const { data } = await axios.post<void>(`${API_URL}/api/auth/logout`,undefined, {
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}`, },
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  try {
    const { data } = await axios.post<RegisterResponse>(
      `${API_URL}/api/auth/register`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
}

