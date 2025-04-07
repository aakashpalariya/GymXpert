'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { getUserFromCookie } from '@/app/_lib/auth';

export function withAuth<P extends React.HTMLProps<any>>(WrappedComponent: React.ComponentType<P>) {
  return (props: P) => {
    const router = useRouter();
    const cookies = getUserFromCookie(); // Get cookies (client-side)
    const token = cookies?.token;    // Check for token
    useEffect(() => {
      if (!token) {
        router.push('/signin'); // Redirect if not logged in
      }
    }, [token, router]);

    if (!token) return <p>Loading...</p>; // Show loading while checking

    return <WrappedComponent {...props} />;
  };
}
