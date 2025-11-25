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

  // List of paths that do NOT require login
  const publicPaths = ['/']; 

  useEffect(() => {
    // If logic:
    // 1. We are done loading checks
    // 2. There is NO user logged in
    // 3. The current page is NOT a public page
    if (!isLoading && !currentUser && !publicPaths.includes(pathname)) {
      router.push('/');
    }
  }, [currentUser, isLoading, pathname, router]);

  // 1. Show Loading Spinner while checking LocalStorage
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#fafafa' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  // 2. If not logged in and trying to access a private page, render nothing (while redirect happens)
  if (!currentUser && !publicPaths.includes(pathname)) {
    return null;
  }

  // 3. Otherwise, render the page content
  return <>{children}</>;
}