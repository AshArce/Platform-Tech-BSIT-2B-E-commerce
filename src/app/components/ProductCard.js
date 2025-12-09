// src/app/components/ProductCard.js
'use client';

import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, CardActionArea, Chip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BlockIcon from '@mui/icons-material/Block'; // Icon for out of stock

const ProductCard = ({ product, onProductClick }) => {
  const { name, price, description, imageUrl, stockCount } = product;
  
  // Calculate stock status based on the database count
  const isOutOfStock = stockCount <= 0;
  const isLowStock = stockCount > 0 && stockCount < 10;

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: 3,
        position: 'relative', // Needed for absolute positioning of badge
        transition: 'transform 0.2s',
        '&:hover': { 
            transform: isOutOfStock ? 'none' : 'scale(1.02)',
            boxShadow: isOutOfStock ? 3 : 6
        },
        // 🌑 GRAYSCALE EFFECT: Visual cue for out of stock
        opacity: isOutOfStock ? 0.7 : 1,
        filter: isOutOfStock ? 'grayscale(100%)' : 'none'
      }}
    >
      {/* 🏷️ STOCK BADGE */}
      <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
        <Chip 
            label={isOutOfStock ? "Out of Stock" : `${stockCount} left`} 
            color={isOutOfStock ? "default" : (isLowStock ? "warning" : "success")} 
            size="small" 
            sx={{ fontWeight: 'bold', bgcolor: isOutOfStock ? 'rgba(0,0,0,0.7)' : undefined, color: isOutOfStock ? 'white' : undefined }}
        />
      </Box>

      <CardActionArea 
        onClick={() => onProductClick(product)} 
        disabled={isOutOfStock} // Disable clicking the image if out of stock
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
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
             WebkitLineClamp: 2, 
          }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color={isOutOfStock ? "inherit" : "secondary"}
          startIcon={isOutOfStock ? <BlockIcon /> : <AddShoppingCartIcon />}
          onClick={() => onProductClick(product)} 
          disabled={isOutOfStock}
          sx={{ borderRadius: 2 }}
        >
          {isOutOfStock ? 'Sold Out' : 'Add'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;