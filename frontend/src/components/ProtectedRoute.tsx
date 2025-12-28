import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const TOKEN_KEY = 'admin_token';
const USER_KEY = 'admin_user';

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check localStorage directly as well, since state updates might be delayed
    const token = localStorage.getItem(TOKEN_KEY);
    const userData = localStorage.getItem(USER_KEY);
    const hasLocalAuth = !!(token && userData);
    
    console.log('ProtectedRoute check:', { 
      isAuthenticated, 
      isLoading, 
      hasLocalAuth,
      token: token ? 'present' : 'missing',
      userData: userData ? 'present' : 'missing'
    });

    if (!isLoading) {
      setCheckingAuth(false);
      
      // If neither state nor localStorage has auth, redirect
      if (!isAuthenticated && !hasLocalAuth) {
        console.log('User not authenticated, redirecting to login');
        setLocation('/admin/login');
      }
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Show loading while checking authentication
  if (isLoading || checkingAuth) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading authentication...</p>
        </div>
      </div>
    );
  }

  // Check localStorage as fallback
  const token = localStorage.getItem(TOKEN_KEY);
  const userData = localStorage.getItem(USER_KEY);
  const hasLocalAuth = !!(token && userData);

  // Show loading while redirecting
  if (!isAuthenticated && !hasLocalAuth) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
