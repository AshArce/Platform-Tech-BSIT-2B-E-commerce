// src/app/products/[id]/page.js
'use client';

import React, { useState, useEffect, use } from 'react'; // 1. Import 'use'
import { Container, Typography, Box, Button, TextField, Paper, Grid } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../context/CartContext';
import { products } from '../../../data/products';
import NextLink from 'next/link'; 

const fetchProductById = (id) => {
  return products.find(p => p.id === parseInt(id));
};

const ProductDetailPage = ({ params }) => { 
  // 2. Unwrap the params Promise using React.use()
  // This converts the Promise into a usable object
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;

  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedProduct = fetchProductById(productId);
    setProduct(fetchedProduct);
    setLoading(false);
  }, [productId]);

  const handleQuantityChange = (event) => {
    const value = Math.max(1, Number(event.target.value));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setQuantity(1); 
      console.log(`Added ${quantity} of ${product.name} to cart.`);
    }
  };

  if (loading) {
    return <Typography sx={{ p: 4 }}>Loading product details...</Typography>;
  }

  if (!product) {
    return <Typography sx={{ p: 4 }}>Product not found.</Typography>;
  }

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
            <Grid>
              <Typography variant="subtitle1">Choose your product quantity:</Typography>
            </Grid>
            <Grid>
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