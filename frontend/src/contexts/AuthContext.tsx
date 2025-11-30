import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy credentials stored in frontend
// For developers: Username: admin, Password: admin123
const DUMMY_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  user: {
    id: '1',
    username: 'admin',
    email: 'admin@nowestinterior.com'
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('admin_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        console.log('User loaded from localStorage:', parsedUser);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('admin_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    console.log('Login attempt:', { username, password });
    
    // Check against dummy credentials
    if (username === DUMMY_CREDENTIALS.username && password === DUMMY_CREDENTIALS.password) {
      try {
        setUser(DUMMY_CREDENTIALS.user);
        localStorage.setItem('admin_user', JSON.stringify(DUMMY_CREDENTIALS.user));
        console.log('Login successful:', DUMMY_CREDENTIALS.user);
        return true;
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
        return false;
      }
    }
    
    console.log('Login failed: Invalid credentials');
    return false;
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('admin_user');
      console.log('User logged out');
    } catch (error) {
      console.error('Error during logout:', error);
    }
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
