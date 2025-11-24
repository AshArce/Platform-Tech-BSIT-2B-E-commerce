// src/app/components/TopNav.jsx
'use client';

import React from 'react'; // removed useEffect if it wasn't there, or keep if needed
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import Link from 'next/link'; 
import { usePathname } from 'next/navigation'; 

const TopNav = () => {
  // HOOKS FIRST
  const { cartCount } = useCart(); 
  const pathname = usePathname(); 

  // CONDITIONAL RETURN LAST
  if (pathname === '/' || pathname === '/auth') {
    return null;
  }

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', borderBottom: '1px solid #eee' }}>
       {/* ... existing code ... */}
       <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, color: 'text.primary' }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'text.primary' }}>
          <Link href="/home" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            E-BIKE EXPRESS
          </Link>
        </Typography>
        <IconButton size="large" aria-label={`show ${cartCount} items in cart`} color="inherit" sx={{ color: 'text.primary' }}>
          <Link href="/checkout" passHref>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;