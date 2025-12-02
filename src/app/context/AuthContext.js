// src/app/context/AuthContext.js
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { users as initialUsers } from '../../data/users'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState(initialUsers);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const storedUsers = localStorage.getItem('FOODIE_USERS');
    if (storedUsers) setAllUsers(JSON.parse(storedUsers));
    else localStorage.setItem('FOODIE_USERS', JSON.stringify(initialUsers));

    const storedSession = localStorage.getItem('FOODIE_CURRENT_USER');
    if (storedSession) setCurrentUser(JSON.parse(storedSession));
    
    setIsLoading(false); 
  }, []);

  // 🚨 UPDATED LOGIN FUNCTION
  const login = (identifier, password) => {
    const foundUser = allUsers.find((u) => {
      if (u.password !== password) return false;
      return (u.email === identifier || u.phone === identifier || u.username === identifier);
    });

    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem('FOODIE_CURRENT_USER', JSON.stringify(foundUser));
      
      // Return an object with success AND the role
      return { success: true, role: foundUser.role }; 
    }
    
    return { success: false, role: null };
  };

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
      role: 'Foodie Member', // Default is normal User
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      avatarUrl: `https://via.placeholder.com/150?text=${userData.fullName.charAt(0).toUpperCase()}`
    };

    const updatedUserList = [...allUsers, newUser];
    setAllUsers(updatedUserList);
    setCurrentUser(newUser);
    localStorage.setItem('FOODIE_USERS', JSON.stringify(updatedUserList));
    localStorage.setItem('FOODIE_CURRENT_USER', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('FOODIE_CURRENT_USER');
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};