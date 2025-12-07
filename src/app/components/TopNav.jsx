// src/app/components/TopNav.jsx
"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// MUI Components (Imports remain the same)
import { 
  AppBar, Toolbar, IconButton, Badge, Typography, Drawer, Box, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, Divider, Avatar, Tooltip, useMediaQuery, useTheme 
} from '@mui/material';

// MUI Icons (Imports remain the same)
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// Context Imports (Imports remain the same)
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useColorMode } from '../context/ThemeContext';

// --- Internal Sidebar Component (MODIFIED) ---
const SidebarMenu = ({ user, isOpen, onClose, onLogout, onDrawerMouseEnter, onDrawerMouseLeave }) => {
  const router = useRouter(); // Use useRouter inside SidebarMenu
  
  // NEW: Handler for smooth page change
  const handleNavigation = (href) => {
    onClose(); // Close the drawer immediately (MUI animation starts)
    
    // FIX: Delay navigation slightly to allow the main page transition to fire
    setTimeout(() => {
        router.push(href);
    }, 250); // Delay should match or slightly exceed the PageTransition duration (0.3s)
  };

  const navItems = [
    { name: "Explore", icon: <ExploreIcon />, href: "/explore" },
    { name: "Orders", icon: <ShoppingBagIcon />, href: "/orders" },
    { name: "Home", icon: <HomeIcon />, href: "/home" },
  ];

  const utilityItems = [
    { name: "Settings", icon: <SettingsIcon />, href: "/settings" },
    { name: "About Us", icon: <InfoIcon />, href: "/about" },
  ];

  return (
    <Drawer 
      anchor="left" 
      open={isOpen} 
      onClose={onClose} 
      onMouseEnter={onDrawerMouseEnter}
      onMouseLeave={onDrawerMouseLeave}
    >
      <Box sx={{ width: 280 }} role="presentation" onKeyDown={onClose}>
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: 'white', color: 'primary.main', mb: 1.5, fontWeight: 'bold' }}>
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </Avatar>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>{user?.name || 'Guest'}</Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>{user?.email || ''}</Typography>
          {/* Change Link to use handleNavigation */}
          <Box 
              onClick={() => handleNavigation('/dashboard')}
              sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.2)', px: 2, py: 0.5, borderRadius: 2, cursor: 'pointer' }}
          >
              <EditIcon fontSize="small" sx={{ mr: 1, fontSize: 16 }} />
              <Typography variant="caption" fontWeight="bold">Edit Profile</Typography>
          </Box>
        </Box>
        <List sx={{ pt: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton 
                  // REMOVED component="a" and href 
                  onClick={() => handleNavigation(item.href)}
              >
                <ListItemIcon sx={{ color: 'text.secondary' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <List>
          {utilityItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton 
                  // REMOVED component="a" and href 
                  onClick={() => handleNavigation(item.href)}
              >
                <ListItemIcon sx={{ color: 'text.secondary' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 1 }}>
            <ListItemButton onClick={onLogout}> 
              <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
              <ListItemText primary="Log Out" primaryTypographyProps={{ color: 'error.main', fontWeight: 'medium' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

// --- Main TopNav Component (No changes needed here) ---
const TopNav = () => {
  const { cartCount } = useCart();
  const { currentUser, logout } = useAuth(); 
  const { mode, toggleColorMode } = useColorMode();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeTimeoutRef = useRef(null); 
  const isDarkMode = mode === 'dark';

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  const handleLogout = () => {
    logout(); 
    setIsDrawerOpen(false); 
    // Add delay for logout navigation as well
    setTimeout(() => {
        router.push('/'); 
    }, 250);
  };
  
  const handleMenuClick = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsDrawerOpen(prev => !prev);
  };

  // Hover handlers for Desktop (No changes needed)
  const handleMouseEnter = () => {
    if (!isMobile) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      setIsDrawerOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      closeTimeoutRef.current = setTimeout(() => {
        setIsDrawerOpen(false);
      }, 300);
    }
  };

  // 🚨 HIDE IF ON LOGIN OR ADMIN PAGES
  if (pathname === '/' || pathname === '/auth' || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', color: 'text.primary' }}>
        <Toolbar>
          
          <Box
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mr: 1 
            }}
          >
            <IconButton 
              size="large" 
              edge="start" 
              color="inherit" 
              aria-label="menu" 
              onClick={handleMenuClick} 
            >
              <MenuIcon />
            </IconButton>
          </Box>


          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: '800', letterSpacing: '-0.5px' }}>
            <Link href="/home" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              E-BIKE EXPRESS
            </Link>
          </Typography>

          <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton onClick={toggleColorMode} color="inherit" sx={{ mr: 1 }}>
              {isDarkMode ? <LightModeIcon sx={{ color: '#FFB300' }} /> : <DarkModeIcon sx={{ color: 'action.active' }} />}
            </IconButton>
          </Tooltip>

          <IconButton size="large" aria-label={`show ${cartCount} items in cart`} color="inherit">
            <Link href="/cart" passHref style={{ color: 'inherit', display: 'flex' }}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* SidebarMenu: Now uses handleNavigation internally */}
      <SidebarMenu 
        isOpen={isDrawerOpen} 
        onClose={() => {
          if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
          }
          setIsDrawerOpen(false);
        }} 
        user={currentUser} 
        onLogout={handleLogout} 
        onDrawerMouseEnter={handleMouseEnter}
        onDrawerMouseLeave={handleMouseLeave}
      />
    </>
  );
};

export default TopNav;