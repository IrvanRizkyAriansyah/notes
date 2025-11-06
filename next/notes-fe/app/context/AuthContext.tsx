"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, data: User) => void;
  logout: () => void;
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = getCookie("token") as string | undefined;
    const savedUser = localStorage.getItem("user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));

    setLoading(false); 
  }, []);

  const login = (token: string, user: User) => {
    setToken(token);
    setUser(user);

    setCookie("token", token, {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    deleteCookie("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
