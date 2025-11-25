// src/app/checkout/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Button, Grid, Paper, Divider, 
  Radio, RadioGroup, FormControlLabel, TextField 
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Import Contexts and Router
import { useCart } from '../context/CartContext'; 
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const { checkoutItems, processOrder } = useCart();
  const { currentUser } = useAuth(); // Get the logged-in user
  const router = useRouter();
  
  const [paymentMethod, setPaymentMethod] = useState('cash');
  
  // Calculate totals based on passed items
  const subtotal = checkoutItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 5.00;
  const finalTotal = (subtotal + deliveryFee).toFixed(2);

  // Redirect back to cart if no items to checkout (e.g. user refreshed page)
  useEffect(() => {
    if (checkoutItems.length === 0) {
      router.push('/cart');
    }
  }, [checkoutItems, router]);

  const handlePlaceOrder = () => {
    // 1. Get the Item IDs
    const paidItemIds = checkoutItems.map(item => item.id);
    
    // 2. Get the User ID (or 0 if guest/dev mode)
    const userId = currentUser ? currentUser.id : 0;

    // 3. Process the order (Pass IDs, Total, and UserID)
    processOrder(paidItemIds, finalTotal, userId);
    
    // 4. Redirect to the Tracking Page
    router.push('/orders');
  };

  // Prevent flash of empty content
  if (checkoutItems.length === 0) return null; 

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', pb: 4 }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: '800', mb: 3 }}>
          Checkout
        </Typography>

        <Grid container spacing={3}>
          
          {/* LEFT COLUMN: Details */}
          <Grid size={{ xs: 12, md: 8 }}>
            
            {/* 1. Delivery Address */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">Delivery Address</Typography>
              </Box>
              <TextField 
                fullWidth 
                multiline 
                rows={2} 
                defaultValue="123 Main Street, Foodie City, FC 90210" 
                variant="outlined" 
                sx={{ bgcolor: '#f9f9f9' }}
              />
            </Paper>

            {/* 2. Payment Method */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <PaymentIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">Payment Method</Typography>
              </Box>
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
                <FormControlLabel value="card" control={<Radio />} label="Credit / Debit Card" />
              </RadioGroup>
            </Paper>

            {/* 3. Items Review */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>Items ({checkoutItems.length})</Typography>
              {checkoutItems.map((item) => (
                <Box key={item.id} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2">{item.quantity}x {item.name}</Typography>
                  <Typography variant="body2" fontWeight="bold">${(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* RIGHT COLUMN: Payment Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 100 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Payment Summary</Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Subtotal</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Delivery Fee</Typography>
                <Typography>${deliveryFee.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography variant="h6" fontWeight="bold">Total To Pay</Typography>
                <Typography variant="h5" fontWeight="bold" color="primary.main">${finalTotal}</Typography>
              </Box>

              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                fullWidth 
                onClick={handlePlaceOrder}
                startIcon={<CheckCircleIcon />}
                sx={{ mt: 3, py: 1.5, borderRadius: 2, fontWeight: 'bold', fontSize: '1.1rem' }}
              >
                Place Order
              </Button>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}