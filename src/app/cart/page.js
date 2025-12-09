// src/app/cart/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Grid, Paper, Divider, Checkbox, FormControlLabel, Chip } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const { cartItems, setCheckoutItems } = useCart();
  const router = useRouter();
  
  // Track 'cartId' instead of 'id'
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    // Select all by default on load using cartId if nothing selected yet
    if (cartItems.length > 0 && selectedIds.length === 0) {
        setSelectedIds(cartItems.map(item => item.cartId));
    }
  }, [cartItems]);

  const handleToggleItem = (cartId) => { 
    if (selectedIds.includes(cartId)) setSelectedIds(selectedIds.filter(id => id !== cartId));
    else setSelectedIds([...selectedIds, cartId]);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) setSelectedIds(cartItems.map(item => item.cartId));
    else setSelectedIds([]);
  };

  const selectedItemsList = cartItems.filter(item => selectedIds.includes(item.cartId));
  
  const subtotal = selectedItemsList.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = selectedIds.length > 0 ? 5.00 : 0; 
  const finalTotal = (subtotal + deliveryFee).toFixed(2);

  const handleProceedToCheckout = () => {
    setCheckoutItems(selectedItemsList); 
    router.push('/checkout'); 
  };
  
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 4, minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', width: 300, height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -45%) rotate(-10deg)', width: 260, height: 220, bgcolor: '#FFC107', borderRadius: '40% 60% 50% 50% / 50% 50% 60% 40%', opacity: 0.8, zIndex: 0 }} />
          <LocalMallIcon sx={{ fontSize: 150, color: 'black', position: 'relative', zIndex: 1 }} />
        </Box>
        <Box sx={{ textAlign: 'center', maxWidth: 350 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Cart Empty</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.5 }}>
            Your cart is currently empty. Browse our menu to add some delicious food!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', pb: 10 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: '800', mb: 3 }}>
          My Cart
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={<Checkbox checked={selectedIds.length === cartItems.length && cartItems.length > 0} onChange={handleSelectAll} />}
                label={`Select All (${cartItems.length} items)`}
              />
            </Paper>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {cartItems.map((item) => (
                <CartItem 
                  key={item.cartId} 
                  item={item} 
                  isSelected={selectedIds.includes(item.cartId)} 
                  onToggle={handleToggleItem} 
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 100, border: '1px solid #eee', display: { xs: 'none', md: 'block' } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Order Summary</Typography>
              <Box sx={{ my: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={1}><Typography color="text.secondary">Subtotal</Typography><Typography fontWeight="medium">₱{subtotal.toFixed(2)}</Typography></Box>
                <Box display="flex" justifyContent="space-between" mb={1}><Typography color="text.secondary">Delivery Fee</Typography><Typography fontWeight="medium">₱{deliveryFee.toFixed(2)}</Typography></Box>
                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                <Box display="flex" justifyContent="space-between"><Typography variant="h6" fontWeight="bold">Total</Typography><Typography variant="h5" fontWeight="bold" color="primary.main">₱{finalTotal}</Typography></Box>
              </Box>
              <Button variant="contained" color="primary" size="large" fullWidth disabled={selectedIds.length === 0} onClick={handleProceedToCheckout} sx={{ mt: 2, py: 1.5, borderRadius: 2, fontSize: '1.1rem', textTransform: 'none' }} endIcon={<ArrowForwardIcon />}>
                Checkout ({selectedIds.length})
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Sticky Checkout */}
      <Paper elevation={10} sx={{ position: 'fixed', bottom: 70, left: 0, right: 0, p: 2, bgcolor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16, display: { xs: 'block', md: 'none' }, zIndex: 999 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box><Typography variant="body2" color="text.secondary">Total ({selectedIds.length} items)</Typography><Typography variant="h5" fontWeight="bold">₱{finalTotal}</Typography></Box>
        </Box>
        <Button variant="contained" color="primary" size="large" fullWidth disabled={selectedIds.length === 0} onClick={handleProceedToCheckout} sx={{ py: 1.5, borderRadius: 3, fontSize: '1rem', fontWeight: 'bold' }}>
          Checkout
        </Button>
      </Paper>
    </Box>
  );
};

export default CartPage;