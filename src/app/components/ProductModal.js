// src/app/components/ProductModal.js
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogContent, Typography, Box, Button, IconButton, 
  Chip, Checkbox, FormControlLabel, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BlockIcon from '@mui/icons-material/Block';
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
      setSelectedSize(product.size && product.size.length > 0 ? product.size[0] : '');
    }
  }, [product]);

  if (!product) return null;

  // 1. CALCULATE STOCK
  const isOutOfStock = product.stockCount <= 0;

  const isDrink = product.category === 'Drinks';
  const isDessert = product.category === 'Dessert';
  const hasSizes = product.size && product.size.length > 0;

  const handleOptionChange = (name) => {
    setOptions(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return; // Guard clause

    const optionString = `${selectedSize}-${options.utensils ? 'u' : ''}-${options.straw ? 's' : ''}-${options.hotSauce ? 'h' : ''}`;
    const cartId = `${product.id}-${optionString}`;

    const itemToAdd = {
      ...product,
      cartId, 
      quantity,
      selectedSize, 
      selectedOptions: options
    };

    addToCart(itemToAdd);
    onClose(); 
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
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            // Gray out if sold out
            filter: isOutOfStock ? 'grayscale(100%)' : 'none' 
          }}
        />
        
        {/* SOLD OUT OVERLAY */}
        {isOutOfStock && (
            <Box sx={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                bgcolor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Typography variant="h4" fontWeight="900" color="white" sx={{ letterSpacing: 2, border: '4px solid white', p: 2, transform: 'rotate(-10deg)' }}>
                    SOLD OUT
                </Typography>
            </Box>
        )}

        <IconButton 
          onClick={onClose}
          sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'white' } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>{product.name}</Typography>
                {/* Stock Indicator */}
                <Chip 
                    label={isOutOfStock ? "Out of Stock" : `${product.stockCount} available`} 
                    color={isOutOfStock ? "default" : "success"} 
                    size="small" 
                    sx={{ mb: 1 }}
                />
            </Box>
            <Typography variant="h6" color="primary.main" fontWeight="bold">₱{product.price.toFixed(2)}</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>{product.description}</Typography>

        <Divider sx={{ my: 2 }} />

        {/* 1. SIZE OPTION */}
        {hasSizes && (
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>Select Size</Typography>
            <Box display="flex" gap={1}>
              {product.size.map((size) => (
                <Chip 
                  key={size} 
                  label={size} 
                  clickable={!isOutOfStock}
                  color={selectedSize === size ? "primary" : "default"}
                  variant={selectedSize === size ? "filled" : "outlined"}
                  onClick={() => !isOutOfStock && setSelectedSize(size)}
                  disabled={isOutOfStock}
                  sx={{ borderRadius: 2, px: 1 }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* 2. EXTRAS & OPTIONS */}
        <Box mb={3} sx={{ opacity: isOutOfStock ? 0.5 : 1, pointerEvents: isOutOfStock ? 'none' : 'auto' }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>Options</Typography>
          <FormControlLabel control={<Checkbox checked={options.utensils} onChange={() => handleOptionChange('utensils')} />} label="Request Utensils" />
          {isDrink && <FormControlLabel control={<Checkbox checked={options.straw} onChange={() => handleOptionChange('straw')} />} label="Request Straw" />}
          {!isDessert && <FormControlLabel control={<Checkbox checked={options.hotSauce} onChange={() => handleOptionChange('hotSauce')} />} label="Add Hot Sauce" />}
        </Box>

        {/* 3. QUANTITY & ADD BUTTON */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={4}>
          {/* Quantity Stepper */}
          <Box display="flex" alignItems="center" border="1px solid #ddd" borderRadius={2} sx={{ opacity: isOutOfStock ? 0.5 : 1 }}>
            <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))} size="small" disabled={isOutOfStock}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ mx: 2, fontWeight: 'bold' }}>{quantity}</Typography>
            {/* Logic: Don't allow quantity > stockCount */}
            <IconButton 
                onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))} 
                size="small"
                disabled={isOutOfStock || quantity >= product.stockCount}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Add Button */}
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            startIcon={isOutOfStock ? <BlockIcon /> : <ShoppingCartIcon />}
            sx={{ borderRadius: 3, px: 4, fontWeight: 'bold', bgcolor: isOutOfStock ? 'action.disabled' : 'primary.main' }}
          >
            {isOutOfStock ? 'Unavailable' : `Add - ₱${(product.price * quantity).toFixed(2)}`}
          </Button>
        </Box>

      </DialogContent>
    </Dialog>
  );
}