// src/app/page.jsx
'use client';

import React, { useState } from 'react';
import { Container, Grid, Snackbar, Alert, Box, Typography } from '@mui/material';
import ProductCard from './components/ProductCard';
import HeroSection from './components/HeroSection'; 
import { products } from '../data/products'; 
import { useCart } from './context/CartContext';

export default function Home() {
  const { addToCart } = useCart(); 
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product);
    setLastAddedItem(product.name);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <HeroSection />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Featured Foods
        </Typography>

        {/* GRID UPDATE: Use 'size' prop */}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }} variant="filled">
          {lastAddedItem} added to your order!
        </Alert>
      </Snackbar>
    </Container>
  );
}