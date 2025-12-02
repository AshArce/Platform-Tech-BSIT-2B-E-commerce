// src/app/components/AuthGuard.js
'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';

export default function AuthGuard({ children }) {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const publicPaths = ['/']; 

  useEffect(() => {
    // Wait until loading is finished
    if (isLoading) return;

    // 1. NOT LOGGED IN? -> Kick to Login
    if (!currentUser && !publicPaths.includes(pathname)) {
      router.push('/');
      return;
    }

    // 2. IS LOGGED IN? Check Permissions
    if (currentUser) {
        const isAdmin = currentUser.role === 'System Administrator';
        const tryingToAccessAdmin = pathname.startsWith('/admin');

        // SCENARIO A: Normal User tries to access Admin Page -> Kick to Home
        if (!isAdmin && tryingToAccessAdmin) {
            router.push('/home');
        }

        // SCENARIO B: Admin tries to access Customer Pages (Home, Cart, etc) -> Kick to Admin Dashboard
        // (Remove this block if you want Admins to be able to see the shop too)
        if (isAdmin && !tryingToAccessAdmin) {
            router.push('/admin');
        }
    }

  }, [currentUser, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: 'background.default' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  // Prevent flash of unauthorized content
  if (!currentUser && !publicPaths.includes(pathname)) return null;
  
  // Strict Mode: Hide content if roles mismatch while redirecting
  if (currentUser) {
      const isAdmin = currentUser.role === 'System Administrator';
      if (!isAdmin && pathname.startsWith('/admin')) return null;
      if (isAdmin && !pathname.startsWith('/admin')) return null;
  }

  return <>{children}</>;
}