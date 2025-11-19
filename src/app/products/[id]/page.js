// src/app/products/[id]/page.js (formerly src/app/Pages/ProductDetail.jsx)
'use client';

import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Paper, Grid } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../context/CartContext';
import { products } from '../../../data/products'; // Adjust path if needed

// Helper function to simulate fetching a single product
const fetchProductById = (id) => {
  // Finds the product where ID matches the route parameter
  return products.find(p => p.id === parseInt(id)); 
};

// Next.js App Router automatically passes route parameters in the 'params' prop
const ProductDetailPage = ({ params }) => { 
  const { addToCart } = useCart();
  const productId = params.id; // Access the dynamic part of the URL: [id]

  const product = fetchProductById(productId);
  const [quantity, setQuantity] = useState(1);
  
  // Handle cases where the product is not found
  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error">404 - Product Not Found</Typography>
        <Button variant="contained" sx={{ mt: 3 }} component={NextLink} href="/">
            Go Back Home
        </Button>
      </Container>
    );
  }

  const handleQuantityChange = (event) => {
    const value = Math.max(1, Number(event.target.value));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity); // Use the current quantity state
    // Reset quantity after adding
    setQuantity(1); 
    console.log(`Added ${quantity} of ${product.name} to cart.`);
  };


  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <img 
          src={product.imageUrl.replace('300x200', '600x400')}
          alt={product.name} 
          style={{ width: '100%', height: 'auto', maxHeight: 400, objectFit: 'cover' }} 
        />
        
        <Box sx={{ p: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>
          
          <Typography variant="h4" color="primary.main" sx={{ mb: 2 }}>
            ${product.price.toFixed(2)}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Grid item>
              <Typography variant="subtitle1">Choose your product quantity:</Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1 }}
                sx={{ width: 100 }}
                size="small"
              />
            </Grid>
          </Grid>
          
          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<FavoriteBorderIcon />} 
              sx={{ minWidth: 60, p: 1 }}
              color="error"
            />
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ flexGrow: 1, fontWeight: 'bold' }}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Order Now' : 'Out of Stock'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{ minWidth: 60, p: 1 }}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetailPage;