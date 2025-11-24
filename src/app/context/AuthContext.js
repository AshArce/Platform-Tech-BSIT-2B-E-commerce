// src/app/context/AuthContext.js
'use client';

import React, { createContext, useState, useContext } from 'react';
import { users as initialUsers } from '../../data/users'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState(initialUsers);

  // LOGIN Logic (Supports Email, Phone, or Username)
  const login = (identifier, password) => {
    const foundUser = allUsers.find((u) => {
      if (u.password !== password) return false;
      return (
        u.email === identifier || 
        u.phone === identifier || 
        u.username === identifier
      );
    });

    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    } else {
      return false;
    }
  };

  // REGISTER Logic
  const register = (userData) => {
    const exists = allUsers.find(u => u.email === userData.email);
    if (exists) return { success: false, message: 'Email already exists!' };

    const newUser = {
      id: Date.now(), 
      name: userData.fullName,
      username: userData.email.split('@')[0], 
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      role: 'Foodie Member', 
      // 🚨 UPDATED HERE: Added 'day: numeric' to get the exact date
      memberSince: new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      avatarUrl: `https://via.placeholder.com/150?text=${userData.fullName.charAt(0).toUpperCase()}`
    };

    setAllUsers([...allUsers, newUser]);
    setCurrentUser(newUser);
    
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};