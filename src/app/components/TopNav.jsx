import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Import essential Material UI components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography'; // Keep this import, though not used, as other components might need it.
import Box from '@mui/material/Box'; 

function TopNav({ cartItemCount = 66 }) {
  // Note: cartItemCount is passed as a prop, defaulting to 0 for safety.
  
  return (
    // By setting position="fixed", the AppBar will always stay at the top 
    // of the viewport, even when the user scrolls.
    <AppBar position="sticky">
      <Toolbar>
        {/* 1. LEFT SIDE: Menu Icon */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          // Usually, an onClick handler would be here to toggle a sidebar/drawer
        >
          <MenuIcon />
        </IconButton>

        {/* SITE TITLE REMOVED HERE: 
        <Typography variant="h6" component="div">
          Food Store
        </Typography>
        */}

        {/* 2. SPACER: This Box component still uses flexGrow: 1 to push the cart icon to the far right. 
           It now fills the entire space between the Menu Icon and the Cart Icon. */}
        <Box sx={{ flexGrow: 1 }} /> 

        {/* 3. RIGHT SIDE: Cart Icon */}
        <IconButton 
          size="large"
          color="inherit"
          aria-label={`show ${cartItemCount} items in cart`} 
          // The click handler would go here to navigate to the cart page
        >
          {/* Badge shows the item count, using 'error' color (red) */}
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}

export default TopNav;