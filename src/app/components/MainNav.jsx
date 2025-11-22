// src/app/components/BottomNav.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search'; 
import AccessTimeIcon from '@mui/icons-material/AccessTime'; 
import PersonIcon from '@mui/icons-material/Person';
import { useRouter, usePathname } from 'next/navigation';

const MainNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(0);

  // 1. HIDE on Login Page logic
  if (pathname === '/' || pathname === '/auth') {
    return null;
  }

  useEffect(() => {
    if (pathname === '/home') setValue(0);
    else if (pathname === '/dashboard') setValue(2); 
  }, [pathname]);

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000, 
        display: { xs: 'block', md: 'none' } 
      }} 
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          switch(newValue) {
            // Home
            case 0:
              router.push('/home'); 
              break;
            // Explore 
            case 1:
              router.push('/explore'); 
              break;
            // Orders
            case 2:
              router.push('/checkout'); 
              break;
            // Dashboard
            case 3:
              router.push('/dashboard'); 
              break;
            default:
              break;
          }
        }}
        // 🎨 STYLE RESTORED HERE
        sx={{ 
          bgcolor: '#FFC107', // The specific Yellow/Amber color
          height: 65, // Ensure consistent height
          '& .Mui-selected': { 
            color: 'black !important', // Force active icon to be black
            fontWeight: 'bold'
          }, 
          '& .MuiBottomNavigationAction-root': { 
            color: 'rgba(0,0,0,0.6)' // Inactive icons are dark grey
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.75rem' // Ensure labels fit nicely
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Explore" icon={<SearchIcon />} />
        <BottomNavigationAction label="Orders" icon={<AccessTimeIcon />} />
        <BottomNavigationAction label="Account" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default MainNav;