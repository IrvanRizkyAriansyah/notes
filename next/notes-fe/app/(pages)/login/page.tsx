"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "../../hooks/useAuth"; // adjust path
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const { mutate: handleLogin, isLoading, error } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(form, {
      onSuccess: (data) => {
        login(data.token, data.data);
        router.push("/notes");
      },
      onError: (err: any) => {
        alert(err.message || "Login failed");
      },
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100">
      <div className="bg-white p-5 flex flex-col gap-3 items-center rounded-xl shadow w-[400px]">
        <h1 className="text-2xl font-bold">Welcome Back 👋</h1>
        <p className="text-gray-400">Sign in to access your personal notes.</p>

        <form className="flex flex-col gap-3 mt-2 w-full" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input rounded-lg h-11 w-full focus:border-primary focus:border-2 focus:outline-0"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input rounded-lg h-11 w-full focus:border-primary focus:border-2 focus:outline-0"
            required
          />
          <button
            type="submit"
            className={`btn btn-primary mt-2 rounded-lg ${isLoading ? "loading mx-auto" : ""}`}
            disabled={isLoading}
          >
            Login
          </button>
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </form>

        <p className="mt-3 text-sm">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
