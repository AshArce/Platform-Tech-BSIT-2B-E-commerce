// src/app/components/CartItem.js
'use client';

import React from 'react';
import { Card, CardContent, Typography, IconButton, Grid, Box, Divider } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCart();
  const { id, name, price, quantity, imageUrl } = item;
  const itemTotal = (price * quantity).toFixed(2);

  const handleAdd = () => {
    // Add 1 unit of the item (using the function created in CartContext)
    addToCart(item, 1);
  };

  const handleRemove = () => {
    // Remove 1 unit of the item, or remove it entirely if quantity reaches zero
    removeFromCart(id);
  };

  const handleDelete = () => {
    // Repeatedly call removeFromCart until the item is completely gone (or update Context function to handle full delete)
    // For simplicity, we'll call remove repeatedly until quantity is 0, or add a direct delete function to context later.
    // For now, let's stick to the existing context function:
    // To implement a full delete button, we need to modify CartContext. Let's use Remove for now.
    // ARCHITECT NOTE: I will update CartContext to include a direct delete function next.
    alert("Full item deletion requires a minor update to CartContext. Using Remove (-) for now!");
  };

  return (
    <Card sx={{ display: 'flex', mb: 2, p: 1, boxShadow: 1 }}>
      <Box sx={{ width: 100, flexShrink: 0, mr: 2 }}>
        <img 
          src={imageUrl} 
          alt={name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} 
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 1, '&:last-child': { pb: 1 } }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              {name}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              Price: ${price.toFixed(2)}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={8}>
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
              
              {/* Using the delete icon as a simple visual element for now */}
              <IconButton size="small" onClick={handleRemove}> 
                <DeleteIcon sx={{ ml: 1 }} />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12}>
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