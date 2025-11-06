"use client"
import Image from "next/image";
import Notes from "./(pages)/notes/page";
import Layout from "./_components/layout";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import { getCookie } from "cookies-next";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { token, loading } = useAuth();
  const cookie = getCookie("token");

  useEffect(() => {
    if (!cookie || !loading && !token) {
      router.replace("/login");
    }
  }, [token, loading, router]);

  return (
    <Layout>
      <Notes />
    </Layout>
  );
}
