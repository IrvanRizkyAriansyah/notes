"use client";
import React, { useState } from "react";
import { useLogout } from "../hooks/useAuth"; // adjust path
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { AddCircle, ArrowDown2, ArrowUp2 } from "iconsax-reactjs";

export default function Header() {
  const router = useRouter();
  const { logout, user } = useAuth();
  const { mutateAsync: handleLogout, isLoading } = useLogout();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function getInitials(name: string) {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  const handleOut = async () => {
    try {
      await handleLogout(); // mutateAsync returns a promise
      logout(); // clear context/localStorage
      router.push("/login");
    } catch (err: any) {
      alert(err.message || "Failed to logout");
    }
  };

  return (
    <div className="px-10 bg-blue-100 fixed top-0 w-full z-10">
      <div className="h-18 mx-auto max-w-7xl flex justify-between items-center">
        <h1 className="text-xl font-bold">My Notes 📝</h1>

        <div className="flex items-center gap-4">
          <button
            className="btn btn-primary btn-dash flex gap-2 rounded-lg"
            onClick={() => router.push("/notes/create")}
          >
            <AddCircle /> New Note
          </button>

          <div className="relative">
            <button
              className="avatar cursor-pointer flex items-center gap-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="w-12 rounded-full">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                  {getInitials(user?.name || "User")}
                </div>
              </div>
              {isOpen ? <ArrowUp2 /> : <ArrowDown2 />}
            </button>

            {isOpen && (
              <ul className="absolute right-0 mt-2 w-52 bg-base-100 rounded-box shadow p-2 z-10">
                <li>
                  <button
                    onClick={handleOut}
                    className={`btn rounded-lg w-full text-left`}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
