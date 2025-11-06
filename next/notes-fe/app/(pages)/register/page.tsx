"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { registerUser, RegisterPayload } from '../../services/auth.service';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/app/hooks/useAuth';

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterPayload>({
    name: '',
    email: '',
    password: ''
  });

  const { mutate: register, isLoading, error } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(form, {
      onSuccess: () => {
        alert("Registration successful!");
        router.push("/login");
      },
      onError: (err: any) => {
        alert(err.message || "Registration failed");
      },
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100">
      <div className="bg-white p-5 flex flex-col gap-3 items-center rounded-xl shadow w-[400px]">
        <h1 className="text-2xl font-bold">Create Your Account</h1>
        <p className="text-gray-400">Join us and start organizing your thoughts today!</p>

        <form className="flex flex-col gap-3 mt-2 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input rounded-lg h-11 w-full focus:border-primary focus:border-2 focus:outline-0"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            className="input rounded-lg h-11 w-full focus:border-primary focus:border-2 focus:outline-0"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            className="input rounded-lg h-11 w-full focus:border-primary focus:border-2 focus:outline-0"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            type="submit"
            className={`btn btn-primary mt-2 rounded-lg ${isLoading ? 'loading mx-auto' : ''}`}
            disabled={isLoading}
          >
            Register
          </button>

          {error && <p className="text-red-500 text-sm mt-1">{(error as Error).message}</p>}
        </form>

        <p className="mt-3 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-primary">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
