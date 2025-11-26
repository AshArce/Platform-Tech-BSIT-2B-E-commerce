// src/app/components/ProductCard.js
'use client';

import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Link as MuiLink } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NextLink from 'next/link'; 

const ProductCard = ({ product, onAddToCart }) => {
  const { id, name, price, description, imageUrl, inStock } = product;
  
  const detailRoute = `/products/${id}`; 

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Image Link - The "New Way" */}
      <MuiLink 
        component={NextLink} 
        href={detailRoute} 
        underline="none" 
        color="inherit"
      >
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={name}
          sx={{ cursor: 'pointer' }}
        />
      </MuiLink>

      <CardContent sx={{ flexGrow: 1 }}>
        {/* 2. Text Link - The "New Way" */}
        <MuiLink 
          component={NextLink} 
          href={detailRoute} 
          underline="hover" 
          color="text.primary"
        >
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
        </MuiLink>

        <Typography variant="h5" color="text.primary" sx={{ mb: 1.5 }}>
          ₱{price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          onClick={() => onAddToCart(product)}
          disabled={!inStock}
        >
          {inStock ? 'Add' : 'No Stock'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;