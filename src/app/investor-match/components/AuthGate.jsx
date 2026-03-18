'use client';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Wraps investor-match pages - redirects unauthenticated users to /login
 */
export default function AuthGate({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login?redirect=/investor-match/discover');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="im-loading-screen">
        <div className="im-loader-ring" />
        <p className="im-loading-text">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="im-loading-screen">
        <div className="im-loader-ring" />
        <p className="im-loading-text">Redirecting to login...</p>
      </div>
    );
  }

  return children;
}
