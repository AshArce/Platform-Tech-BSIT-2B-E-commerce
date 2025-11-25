// src/app/components/CartItem.js
'use client';

import React from 'react';
import { Card, CardContent, Typography, IconButton, Grid, Box, Divider, Checkbox } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';

// 1. Accept new props: isSelected, onToggle
const CartItem = ({ item, isSelected, onToggle }) => {
  const { addToCart, removeFromCart, deleteItemFromCart } = useCart();
  const { id, name, price, quantity, imageUrl } = item;
  const itemTotal = (price * quantity).toFixed(2);

  const handleAdd = () => addToCart(item, 1);
  const handleRemove = () => removeFromCart(id);
  const handleDelete = () => deleteItemFromCart ? deleteItemFromCart(id) : removeFromCart(id); 

  return (
    <Card sx={{ display: 'flex', mb: 2, p: 1, boxShadow: 1, alignItems: 'center' }}>
      
      {/* 2. Add the Checkbox here */}
      <Checkbox 
        checked={isSelected || false} 
        onChange={() => onToggle(id)}
        sx={{ mr: 1 }}
      />

      <Box sx={{ width: 100, flexShrink: 0, mr: 2 }}>
        <img 
          src={imageUrl} 
          alt={name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} 
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 1, '&:last-child': { pb: 1 } }}>
        <Grid container spacing={1} alignItems="center">
          
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {name}
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Price: ${price.toFixed(2)}
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 8 }}>
            <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ gap: 1 }}>
              <IconButton size="small" onClick={handleRemove} disabled={quantity === 0}>
                <RemoveCircleIcon color="error" />
              </IconButton>
              <Typography variant="body1" sx={{ minWidth: 20, textAlign: 'center' }}>
                {quantity}
              </Typography>
              <IconButton size="small" onClick={handleAdd}>
                <AddCircleIcon color="primary" />
              </IconButton>
              <IconButton size="small" onClick={handleDelete}> 
                <DeleteIcon sx={{ ml: 1 }} />
              </IconButton>
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 0.5 }} />
            <Typography variant="body1" align="right" fontWeight="bold">
              Total: ${itemTotal}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItem;