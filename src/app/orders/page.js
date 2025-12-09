// src/app/orders/page.js
'use client';

import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, Chip, Button, Divider, Stack, Grid 
} from '@mui/material';

// Icons
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import MopedIcon from '@mui/icons-material/Moped';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; 

// Contexts
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered': return 'success';
    case 'Cooking': return 'warning';
    case 'Waiting for Courier': return 'warning';
    case 'On the Way': return 'info';
    case 'Refunded': return 'error';
    case 'Refund Requested': return 'secondary';
    case 'Cancelled': return 'error';
    default: return 'default';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Cooking': return <RestaurantIcon fontSize="small" />;
    case 'Waiting for Courier': return <MopedIcon fontSize="small" />;
    case 'On the Way': return <LocalShippingIcon fontSize="small" />;
    case 'Delivered': return <CheckCircleIcon fontSize="small" />;
    case 'Cancelled': return <CancelIcon fontSize="small" />;
    case 'Refunded': return <RestartAltIcon fontSize="small" />;
    case 'Refund Requested': return <HourglassEmptyIcon fontSize="small" />;
    default: return null;
  }
};

const FILTER_TABS = [
  { label: 'All', statuses: [] }, 
  { label: 'To Receive', statuses: ['Cooking', 'Waiting for Courier', 'On the Way'] },
  { label: 'Delivered', statuses: ['Delivered'] },
  { label: 'Refund/Cancel', statuses: ['Refunded', 'Cancelled', 'Refund Requested'] } 
];

export default function OrdersPage() {
  const { orderHistory, updateOrderStatus } = useCart();
  const { currentUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState('All');

  // 1. Filter by Current User
  const userOrders = currentUser 
    ? orderHistory.filter(order => order.userId === currentUser.id)
    : [];

  // 2. Filter by Active Tab
  const filteredOrders = userOrders.filter(order => {
    if (activeTab === 'All') return true;
    const currentTabConfig = FILTER_TABS.find(tab => tab.label === activeTab);
    return currentTabConfig.statuses.includes(order.status);
  });

  return (
    <Container maxWidth="md" sx={{ py: 4, pb: 10 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        My Orders
      </Typography>

      {/* Filter Tabs */}
      <Box sx={{ mb: 3, overflowX: 'auto', pb: 1 }}>
        <Stack direction="row" spacing={1}>
          {FILTER_TABS.map((tab) => (
            <Chip 
              key={tab.label}
              label={tab.label}
              clickable
              onClick={() => setActiveTab(tab.label)}
              color={activeTab === tab.label ? "primary" : "default"}
              variant={activeTab === tab.label ? "filled" : "outlined"}
              sx={{ fontWeight: activeTab === tab.label ? 'bold' : 'normal' }}
            />
          ))}
        </Stack>
      </Box>

      {/* Orders List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredOrders.length === 0 ? (
           <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#fafafa' }} elevation={0}>
             <Typography color="text.secondary">No orders found in this tab.</Typography>
           </Paper>
        ) : (
          filteredOrders.map((order) => (
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
                  variant={['Cooking', 'Waiting for Courier', 'On the Way', 'Refund Requested'].includes(order.status) ? 'filled' : 'outlined'}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Items List */}
              <Box sx={{ mb: 2 }}>
                {order.items.map((item, index) => (
                  <Grid container key={index} justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        <strong style={{ marginRight: '8px' }}>{item.quantity}x</strong> 
                        {item.name}
                      </Typography>
                      
                      {/* 🆕 SHOW SIZE & OPTIONS FROM DB */}
                      <Box display="flex" flexWrap="wrap" gap={0.5} mt={0.5} ml={3.5}>
                            {item.size && (
                                <Typography variant="caption" sx={{ bgcolor: '#eee', px: 0.5, borderRadius: 0.5, fontWeight: 'bold' }}>
                                    {item.size}
                                </Typography>
                            )}
                            {item.selectedOptions?.utensils && <Typography variant="caption" color="text.secondary">+ Utensils</Typography>}
                            {item.selectedOptions?.straw && <Typography variant="caption" color="text.secondary">, + Straw</Typography>}
                            {item.selectedOptions?.hotSauce && <Typography variant="caption" color="text.secondary">, + Hot Sauce</Typography>}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body2" fontWeight="bold" color="text.primary">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Box>

              <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

              {/* Total */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Typography variant="body2" color="text.secondary">Delivery Fee: ₱5.00</Typography>
                <Box textAlign="right">
                  <Typography variant="body2" color="text.secondary">Order Total</Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary.main">₱{Number(order.total).toFixed(2)}</Typography>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
                {order.status === 'Cooking' && (
                  <Button variant="outlined" color="error" size="small" startIcon={<CancelIcon />} onClick={() => updateOrderStatus(order.id, 'Cancelled')}>
                    Cancel Order
                  </Button>
                )}
                
                {order.status === 'Waiting for Courier' && (
                  <Typography variant="caption" color="warning.main" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <MopedIcon fontSize="small" /> Finding nearest rider...
                  </Typography>
                )}
                
                {order.status === 'On the Way' && (
                  <Button variant="contained" color="primary" size="small" startIcon={<CheckCircleIcon />} onClick={() => updateOrderStatus(order.id, 'Delivered')}>
                    Order Received
                  </Button>
                )}
                
                {order.status === 'Delivered' && (
                  <Button variant="outlined" color="error" size="small" startIcon={<RestartAltIcon />} onClick={() => updateOrderStatus(order.id, 'Refund Requested')}>
                    Request Refund
                  </Button>
                )}
                
                {order.status === 'Refund Requested' && (
                  <Typography variant="caption" color="secondary.main" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                    Refund under review...
                  </Typography>
                )}
                
                {['Cancelled', 'Refunded'].includes(order.status) && (
                  <Typography variant="caption" color="text.disabled" sx={{ fontStyle: 'italic' }}>
                    No further actions available
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