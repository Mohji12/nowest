import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BASE_URL } from '@/lib/baseUrl';
import { API_ENDPOINTS } from '@/lib/config';

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

const TOKEN_KEY = 'admin_token';
const USER_KEY = 'admin_user';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userData = localStorage.getItem(USER_KEY);
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log('Restored user from localStorage:', parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login for:', username);
      
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.ADMIN_LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'omit',
        body: JSON.stringify({ username, password }),
      });

      console.log('Login response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Login failed' }));
        console.error('Login failed:', errorData);
        return false;
      }

      const data = await response.json();
      console.log('Login successful, received data:', { ...data, access_token: data.access_token?.substring(0, 20) + '...' });

      // Store token and user data
      if (data.access_token && data.admin) {
        localStorage.setItem(TOKEN_KEY, data.access_token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.admin));
        setUser(data.admin);
        console.log('Login successful, user set:', data.admin);
        return true;
      }

      console.error('Login response missing token or admin data');
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    console.log('Logged out successfully');
  };

  const isAuthenticated = !!user;

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
