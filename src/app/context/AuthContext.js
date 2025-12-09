// src/app/context/AuthContext.js
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  // Load session from LocalStorage on startup
  useEffect(() => {
    const storedSession = localStorage.getItem('FOODIE_CURRENT_USER');
    if (storedSession) {
      setCurrentUser(JSON.parse(storedSession));
    }
    setIsLoading(false); 
  }, []);

  // 1. LOGIN (API)
  const login = async (identifier, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCurrentUser(data.user);
        localStorage.setItem('FOODIE_CURRENT_USER', JSON.stringify(data.user));
        return { success: true, role: data.user.role };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  };

  // 2. REGISTER (API)
  const register = async (userData) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        // Auto-login after register? Or just return success.
        // Let's set current user immediately for smooth UX
        setCurrentUser(data.user);
        localStorage.setItem('FOODIE_CURRENT_USER', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  };

  // 3. UPDATE PROFILE (API)
  const updateProfile = async (formData) => {
    try {
      const res = await fetch('/api/auth/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Update local state immediately with the new user data
        setCurrentUser(data.user);
        localStorage.setItem('FOODIE_CURRENT_USER', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Update failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('FOODIE_CURRENT_USER');
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};