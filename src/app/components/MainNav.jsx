// src/app/components/MainNav.jsx
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

  // 2. This Hook must run on every render
  useEffect(() => {
    if (pathname === '/home') setValue(0);
    else if (pathname === '/explore') setValue(1); 
    else if (pathname === '/checkout') setValue(2); 
    else if (pathname === '/dashboard') setValue(3); 
  }, [pathname]);

  // 3. SAFE RETURN: Now we can return null if on login page
  if (pathname === '/' || pathname === '/auth') {
    return null;
  }

  return (
    <Paper 
      sx={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, 
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
            case 0: router.push('/home'); break;
            case 1: router.push('/explore'); break;
            case 2: router.push('/checkout'); break;
            case 3: router.push('/dashboard'); break;
            default: break;
          }
        }}
        sx={{ 
          bgcolor: '#FFC107', height: 65, 
          '& .Mui-selected': { color: 'black !important', fontWeight: 'bold' }, 
          '& .MuiBottomNavigationAction-root': { color: 'rgba(0,0,0,0.6)' },
          '& .MuiBottomNavigationAction-label': { fontSize: '0.75rem' }
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