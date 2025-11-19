// src/app/components/BottomNav.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search'; // For "Explore"
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // For "Orders"
import PersonIcon from '@mui/icons-material/Person';
import { useRouter, usePathname } from 'next/navigation';

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(0);

  // Update the active tab based on the current URL
  useEffect(() => {
    if (pathname === '/') setValue(0);
    else if (pathname === '/dashboard') setValue(2); 
    // We map both Orders and Account to dashboard for this prototype
  }, [pathname]);

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        display: { xs: 'block', md: 'none' } // Hide on Desktop (md and up)
      }} 
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          // Route logic
          switch(newValue) {
            case 0:
              router.push('/'); // Home
              break;
            case 1:
              router.push('/'); // Explore (Goes to Home/Search for now)
              break;
            case 2:
              router.push('/dashboard'); // Orders
              break;
            case 3:
              router.push('/dashboard'); // Account (Goes to Dashboard profile for now)
              break;
            default:
              break;
          }
        }}
        // Styling to match your Yellow Prototype
        sx={{ 
          bgcolor: '#FFC107', // Amber/Yellow color
          '& .Mui-selected': { color: 'black' }, // Active icon color
          '& .MuiBottomNavigationAction-root': { color: 'rgba(0,0,0,0.6)' } // Inactive icon color
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

export default BottomNav;