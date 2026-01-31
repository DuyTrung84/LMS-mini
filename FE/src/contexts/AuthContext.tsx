import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiFetch } from '@/lib/api';

export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  accessToken?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('lms_user');
    const storedToken = localStorage.getItem('lms_token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await apiFetch<{
        username: string;
        roles: string[];
        accessToken: string;
      }>('/login', {
        method: 'POST',
        body: JSON.stringify({
          email: email, // Backend now expects email
          password: password,
        }),
      });

      if (response && response.accessToken) {
        const newUser: User = {
          id: response.username, // Using username as ID for now
          username: response.username,
          email: response.username, // Assuming username is email
          name: response.username.split('@')[0], // Mocking name from email
          role: response.roles.includes('ADMIN') ? 'ADMIN' :
            response.roles.includes('TEACHER') ? 'TEACHER' : 'STUDENT',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${response.username}`,
          accessToken: response.accessToken,
        };

        setUser(newUser);
        localStorage.setItem('lms_user', JSON.stringify(newUser));
        localStorage.setItem('lms_token', response.accessToken);
        setLoading(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiFetch('/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('lms_user');
      localStorage.removeItem('lms_token');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
