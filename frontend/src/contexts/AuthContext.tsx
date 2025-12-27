import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BASE_URL } from '@/lib/baseUrl';

interface User {
  id: string;
  username: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Always authenticated - no login required
  const [user] = useState<User | null>({
    id: 'admin-001',
    username: 'admin',
    email: 'admin@nowestinterior.com'
  });
  const [isLoading] = useState(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    // No-op: authentication is disabled
    return true;
  };

  const logout = () => {
    // No-op: just redirect to home if needed
    console.log('Logout called (authentication disabled)');
  };

  const isAuthenticated = true; // Always authenticated

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
