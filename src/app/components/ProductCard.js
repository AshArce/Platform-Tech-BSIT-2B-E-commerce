// src/app/components/ProductCard.js
'use client';

import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, CardActionArea } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Note: onProductClick replaces the old NextLink logic
const ProductCard = ({ product, onProductClick }) => {
  const { name, price, description, imageUrl, inStock } = product;

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.02)' } 
      }}
    >
      {/* 1. Make the top part clickable to open modal */}
      <CardActionArea onClick={() => onProductClick(product)} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            {name}
          </Typography>
          <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>
            ₱{price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
             display: '-webkit-box',
             overflow: 'hidden',
             WebkitBoxOrient: 'vertical',
             WebkitLineClamp: 2, // Limit description lines
          }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>

      {/* 2. Direct Add Button (Optional: Can also just open modal) */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<AddShoppingCartIcon />}
          onClick={() => onProductClick(product)} // Opens modal to select options
          disabled={!inStock}
          sx={{ borderRadius: 2 }}
        >
          {inStock ? 'Add' : 'Sold Out'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;