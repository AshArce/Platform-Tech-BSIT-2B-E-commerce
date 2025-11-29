// src/app/components/ProductModal.js
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogContent, Typography, Box, Button, IconButton, 
  Chip, Checkbox, FormControlLabel, RadioGroup, Radio, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';

export default function ProductModal({ open, onClose, product }) {
  const { addToCart } = useCart();
  
  // States
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [options, setOptions] = useState({
    utensils: false,
    straw: false,
    hotSauce: false
  });

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setOptions({ utensils: false, straw: false, hotSauce: false });
      // Default to first size if available, else empty
      setSelectedSize(product.size && product.size.length > 0 ? product.size[0] : '');
    }
  }, [product]);

  if (!product) return null;

  // Logic for displaying options
  const isDrink = product.category === 'Drinks';
  const isDessert = product.category === 'Dessert';
  const hasSizes = product.size && product.size.length > 0;

  const handleOptionChange = (name) => {
    setOptions(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleAddToCart = () => {
    // Generate a unique ID for the cart item based on options
    // e.g. "1-Medium-utensils-hotsauce"
    const optionString = `${selectedSize}-${options.utensils ? 'u' : ''}-${options.straw ? 's' : ''}-${options.hotSauce ? 'h' : ''}`;
    const cartId = `${product.id}-${optionString}`;

    const itemToAdd = {
      ...product,
      cartId, // Unique ID for Cart Context
      quantity,
      selectedSize, // Save specific selection
      selectedOptions: options
    };

    addToCart(itemToAdd);
    onClose(); // Close modal
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}
    >
      {/* Header Image */}
      <Box sx={{ position: 'relative', height: 200, width: '100%' }}>
        <img 
          src={product.imageUrl} 
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <IconButton 
          onClick={onClose}
          sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'white' } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>{product.name}</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>{product.description}</Typography>
        <Typography variant="h6" color="primary.main" fontWeight="bold">₱{product.price.toFixed(2)}</Typography>

        <Divider sx={{ my: 2 }} />

        {/* 1. SIZE OPTION (Only if product has sizes) */}
        {hasSizes && (
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>Select Size</Typography>
            <Box display="flex" gap={1}>
              {product.size.map((size) => (
                <Chip 
                  key={size} 
                  label={size} 
                  clickable 
                  color={selectedSize === size ? "primary" : "default"}
                  variant={selectedSize === size ? "filled" : "outlined"}
                  onClick={() => setSelectedSize(size)}
                  sx={{ borderRadius: 2, px: 1 }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* 2. EXTRAS & OPTIONS */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>Options</Typography>
          
          {/* Utensils (Always Show) */}
          <FormControlLabel
            control={<Checkbox checked={options.utensils} onChange={() => handleOptionChange('utensils')} />}
            label="Request Utensils"
          />

          {/* Straw (Drinks Only) */}
          {isDrink && (
            <FormControlLabel
              control={<Checkbox checked={options.straw} onChange={() => handleOptionChange('straw')} />}
              label="Request Straw"
            />
          )}

          {/* Hot Sauce (Not Desserts) */}
          {!isDessert && (
            <FormControlLabel
              control={<Checkbox checked={options.hotSauce} onChange={() => handleOptionChange('hotSauce')} />}
              label="Add Hot Sauce"
            />
          )}
        </Box>

        {/* 3. QUANTITY & ADD BUTTON */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={4}>
          {/* Quantity Stepper */}
          <Box display="flex" alignItems="center" border="1px solid #ddd" borderRadius={2}>
            <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))} size="small">
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ mx: 2, fontWeight: 'bold' }}>{quantity}</Typography>
            <IconButton onClick={() => setQuantity(quantity + 1)} size="small">
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Add Button */}
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleAddToCart}
            sx={{ borderRadius: 3, px: 4, fontWeight: 'bold' }}
          >
            Add to Cart - ₱{(product.price * quantity).toFixed(2)}
          </Button>
        </Box>

      </DialogContent>
    </Dialog>
  );
}