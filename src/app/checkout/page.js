// src/app/checkout/page.js
'use client';

import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper, Divider } from '@mui/material';
// Using LocalMallIcon as it looks closer to the solid basket in your image
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem'; 
import NextLink from 'next/link';

const CheckoutPage = () => {
  const { cartItems, cartTotal } = useCart();
  
  // --- CUSTOM EMPTY STATE DESIGN ---
  if (cartItems.length === 0) {
    return (
      <Container 
        maxWidth="sm" 
        sx={{ 
          py: 4, 
          minHeight: '60vh', // Ensure enough height to center vertically
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // Center content vertically
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
          My Order
        </Typography>

        {/* The Graphic Container (Illustration Area) */}
        <Box sx={{ position: 'relative', width: 300, height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
          
          {/* 1. The Abstract Yellow Blob Background */}
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -45%) rotate(-10deg)', // Center and tilt
              width: 260,
              height: 220,
              bgcolor: '#FFC107', // Brand Yellow
              borderRadius: '40% 60% 50% 50% / 50% 50% 60% 40%', // CSS trick for organic blob shape
              opacity: 0.8,
              zIndex: 0, // Send to back
            }} 
          />

          {/* 2. The Main Black Basket Icon */}
          <LocalMallIcon 
            sx={{ 
              fontSize: 150, // Very large
              color: 'black', 
              position: 'relative', // Ensure it sits above blob
              zIndex: 1 
            }} 
          />
           {/* Optional: Small decorative dots/crosses could be added here as small absolute Boxes if desired */}
        </Box>

        {/* The Text Content */}
        <Box sx={{ textAlign: 'center', maxWidth: 350 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Order Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.5 }}>
            Your order list is currently empty. Browse our menu to place your first order.
          </Typography>
        </Box>

      {/* Note: I removed the "Go to Products" button as it wasn't in your reference image, 
          but the bottom Nav handles that anyway. */}
      </Container>
    );
  }
  // ---------------------------------


  // Content for when the cart has items (Unchanged from before)
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Your Shopping Cart
      </Typography>
      
      <Grid container spacing={3}>
        
        {/* Left Column: Cart Item List */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Box>
        </Grid>

        {/* Right Column: Order Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Order Summary
            </Typography>
            <Divider sx={{ my: 1 }} />
            
            <Box display="flex" justifyContent="space-between" sx={{ my: 1 }}>
              <Typography variant="body1">Subtotal:</Typography>
              <Typography variant="body1">${cartTotal}</Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between" sx={{ my: 1 }}>
              <Typography variant="body1">Delivery Fee:</Typography>
              <Typography variant="body1">$5.00</Typography>
            </Box>
            
            <Divider sx={{ my: 1.5 }} />
            
            <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">Order Total:</Typography>
              {/* Calculate total including simulated shipping */}
              <Typography variant="h6" fontWeight="bold">${(parseFloat(cartTotal) + 5).toFixed(2)}</Typography>
            </Box>

            <Button variant="contained" color="secondary" size="large" fullWidth>
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;