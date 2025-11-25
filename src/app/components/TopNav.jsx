"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter for logout redirect

// MUI Components
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Badge, 
  Typography, 
  Drawer, 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Avatar 
} from '@mui/material';

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';

// Context Imports
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // 1. Import Auth Context

// --- Internal Sidebar Component ---
// Added 'onLogout' prop here
const SidebarMenu = ({ user, isOpen, onClose, onLogout }) => {
  
  const navItems = [
    { name: "Explore", icon: <ExploreIcon />, href: "/explore" },
    { name: "Orders", icon: <ShoppingBagIcon />, href: "/orders" },
    { name: "Home", icon: <HomeIcon />, href: "/home" },
  ];

  const utilityItems = [
    { name: "Settings", icon: <SettingsIcon />, href: "/account/settings" },
    { name: "About Us", icon: <InfoIcon />, href: "/about" },
  ];

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        {/* --- Profile Header Section --- */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          {/* Dynamic Avatar and Name from AuthContext */}
          <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', mb: 1.5 }}>
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </Avatar>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Hi, {user?.name || 'Guest'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {user?.email || ''}
          </Typography>

          <ListItem disablePadding sx={{ width: '100%', justifyContent: 'center' }}>
            <ListItemButton
              sx={{ width: 'auto', p: 0.5 }}
              component="a"
              href="/dashboard"
              onClick={onClose}
            >
              <ListItemIcon sx={{ minWidth: 28 }}><EditIcon fontSize="small" color="primary" /></ListItemIcon>
              <ListItemText
                primary="Edit Profile"
                primaryTypographyProps={{ color: 'primary', fontSize: '14px' }}
              />
            </ListItemButton>
          </ListItem>
        </Box>

        {/* --- Navigation Links --- */}
        <List>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton component="a" href={item.href} onClick={onClose}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* --- Utility Actions --- */}
        <List>
          {utilityItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton component="a" href={item.href} onClick={onClose}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}

          {/* Log Out Button */}
          <ListItem disablePadding sx={{ mt: 2 }}>
            <ListItemButton onClick={onLogout}> 
              <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
              <ListItemText primary="Log Out" primaryTypographyProps={{ color: 'error.main' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

// --- Main TopNav Component ---
const TopNav = () => {
  const { cartCount } = useCart();
  const { currentUser, logout } = useAuth(); // 2. Get Real User Data & Logout Function
  const pathname = usePathname();
  const router = useRouter();
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Handle Logout Logic
  const handleLogout = () => {
    logout();             // clear context
    setIsDrawerOpen(false); // close sidebar
    router.push('/');     // redirect to login/splash
  };

  if (pathname === '/' || pathname === '/auth') {
    return null;
  }

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: 'white', borderBottom: '1px solid #eee' }}>
        <Toolbar>
          
          <IconButton 
            size="large" 
            edge="start" 
            aria-label="menu" 
            sx={{ mr: 2, color: 'text.primary' }}
            onClick={() => setIsDrawerOpen(true)} 
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'text.primary' }}>
            <Link href="/home" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              E-BIKE EXPRESS
            </Link>
          </Typography>

          <IconButton 
            size="large" 
            aria-label={`show ${cartCount} items in cart`} 
            sx={{ color: 'text.primary' }}
          >
            <Link href="/cart" passHref>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* Pass currentUser and handleLogout to Sidebar */}
      <SidebarMenu 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        user={currentUser} 
        onLogout={handleLogout}
      />
    </>
  );
};

export default TopNav;