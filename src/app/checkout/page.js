// src/app/checkout/page.js
'use client';

import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper, Divider } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem'; // Import the new component
import NextLink from 'next/link';

const CheckoutPage = () => {
  const { cartItems, cartTotal } = useCart();
  
  if (cartItems.length === 0) {
    // This is the empty cart state matching your prototype
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingBasketIcon sx={{ fontSize: 100, color: 'text.secondary', mb: 3 }} />
        <Typography variant="h4" gutterBottom>
          Your Order is Empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your shopping cart is currently empty. Browse our products to start your order!
        </Typography>
        <NextLink href="/" passHref>
          <Button variant="contained" size="large">
            Go to Products
          </Button>
        </NextLink>
      </Container>
    );
  }

  // Content for when the cart has items
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Your Shopping Cart
      </Typography>
      
      <Grid container spacing={3}>
        
        {/* Left Column: Cart Item List */}
        <Grid item xs={12} md={8}>
          <Box>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Box>
        </Grid>

        {/* Right Column: Order Summary */}
        <Grid item xs={12} md={4}>
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
              <Typography variant="body1">Shipping (Simulated):</Typography>
              <Typography variant="body1">$5.00</Typography>
            </Box>
            
            <Divider sx={{ my: 1.5 }} />
            
            <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">Order Total:</Typography>
              {/* Calculate total including simulated shipping */}
              <Typography variant="h6" fontWeight="bold">${(parseFloat(cartTotal) + 5).toFixed(2)}</Typography>
            </Box>

            <Button variant="contained" color="secondary" size="large" fullWidth>
              Proceed to Payment
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;