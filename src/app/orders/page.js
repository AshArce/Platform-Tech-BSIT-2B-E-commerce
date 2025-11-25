// src/app/orders/page.js
'use client';

import React from 'react';
import { Container, Typography, Box, Paper, Chip, Button, Divider, Grid } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // 1. Import Auth

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered': return 'success';
    case 'Cooking': return 'warning';
    case 'On the Way': return 'info';
    case 'Refunded': return 'error';
    default: return 'default';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Cooking': return <RestaurantIcon fontSize="small" />;
    case 'On the Way': return <LocalShippingIcon fontSize="small" />;
    case 'Delivered': return <CheckCircleIcon fontSize="small" />;
    default: return null;
  }
};

export default function OrdersPage() {
  const { orderHistory, updateOrderStatus } = useCart();
  const { currentUser } = useAuth(); // 2. Get Current User

  // 3. FILTER: Only show orders belonging to this user
  const myOrders = currentUser 
    ? orderHistory.filter(order => order.userId === currentUser.id)
    : [];

  return (
    <Container maxWidth="md" sx={{ py: 4, pb: 10 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Track Orders
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {myOrders.length === 0 ? (
           <Typography color="text.secondary">No orders found.</Typography>
        ) : (
          myOrders.map((order) => (
            <Paper key={order.id} sx={{ p: 3, borderRadius: 2, border: '1px solid #eee' }} elevation={0}>
              
              {/* Header */}
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">{order.id}</Typography>
                  <Typography variant="caption" color="text.secondary">{order.date}</Typography>
                </Box>
                <Chip 
                  icon={getStatusIcon(order.status)}
                  label={order.status} 
                  color={getStatusColor(order.status)} 
                  size="small" 
                  variant={['Cooking', 'On the Way'].includes(order.status) ? 'filled' : 'outlined'}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* 4. ITEMS LIST DISPLAY */}
              <Box sx={{ mb: 2 }}>
                {order.items.map((item, index) => (
                  <Box key={index} display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2">
                      {/* Shows "2x Burger" */}
                      <strong>{item.quantity}x</strong> {item.name}
                    </Typography>
                    {/* Optional: Show price per line item if you want */}
                    {/* <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography> */}
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

              {/* Total */}
              <Box textAlign="right" mt={2}>
                <Typography variant="body2" color="text.secondary">Order Total</Typography>
                <Typography variant="h6" fontWeight="bold">${Number(order.total).toFixed(2)}</Typography>
              </Box>

              {/* Actions */}
              <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
                {order.status === 'On the Way' && (
                  <Button variant="contained" color="primary" size="small" startIcon={<CheckCircleIcon />} onClick={() => updateOrderStatus(order.id, 'Delivered')}>
                    Order Received
                  </Button>
                )}
                {order.status === 'Delivered' && (
                  <Button variant="outlined" color="error" size="small" startIcon={<RestartAltIcon />} onClick={() => updateOrderStatus(order.id, 'Refunded')}>
                    Request Refund
                  </Button>
                )}
                {order.status === 'Cooking' && (
                  <Typography variant="caption" color="warning.main" sx={{ fontWeight: 'bold' }}>
                    Kitchen is preparing your order...
                  </Typography>
                )}
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </Container>
  );
}