"use client"
import { useAuth } from '@/app/context/AuthContext';
import Layout from '../../_components/layout';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const {token, loading} = useAuth()
  const cookie = getCookie('token')

  useEffect(() => {
    if (!cookie || !loading && !token) {
      router.replace('/login');
    }
  }, [token, loading, router]);
  
  return <Layout>{children}</Layout>;
}
