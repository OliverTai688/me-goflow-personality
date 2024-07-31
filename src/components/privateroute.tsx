"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('Checking authentication status...');
    console.log('Is Authenticated:', isAuthenticated);

    if (isAuthenticated === null) {
      // Still checking authentication status
      return;
    }

    if (!isAuthenticated) {
      console.log('User is not authenticated. Redirecting to /login...');
      router.push('/login');
    } else {
      console.log('User is authenticated. Staying on the page.');
    }

    setLoading(false);
  }, [isAuthenticated, router]);

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator while checking authentication
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default PrivateRoute;
