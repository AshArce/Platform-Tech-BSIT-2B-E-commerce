// src/app/dashboard/page.js
'use client';

import React, { useMemo } from 'react';
import { 
  Container, Typography, Grid, Paper, Box, List, ListItem, ListItemText, 
  Chip, Divider 
} from '@mui/material';
import ProfileCard from '../components/ProfileCard';

// 1. Import Contexts
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; 

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered': return 'success';
    case 'Cooking': return 'warning'; 
    case 'On the Way': return 'info';
    case 'Processing': return 'info';
    case 'Refunded': return 'error';
    case 'Cancelled': return 'error';
    default: return 'default';
  }
};

const DashboardPage = () => {
  const { currentUser } = useAuth(); 
  const { orderHistory } = useCart(); // 2. Get Global History

  // 3. Filter & Calculate Stats (useMemo for performance)
  const dashboardData = useMemo(() => {
    if (!currentUser) return { orders: [], count: 0, spend: 0 };

    // A. Get only THIS user's orders
    const myOrders = orderHistory.filter(order => order.userId === currentUser.id);

    // B. Calculate Valid Spend (Exclude Cancelled/Refunded/Returned)
    const validOrders = myOrders.filter(order => 
      !['Cancelled', 'Refunded', 'Returned'].includes(order.status)
    );

    const totalSpend = validOrders.reduce((acc, order) => acc + parseFloat(order.total), 0);

    return {
      orders: myOrders,
      count: myOrders.length,
      spend: totalSpend.toFixed(2)
    };
  }, [currentUser, orderHistory]);

  if (!currentUser) return null; 

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        My Dashboard
      </Typography>

      <Grid container spacing={3}>
        
        {/* Left Column (Profile) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ProfileCard user={currentUser} />
        </Grid>

        {/* Right Column (Orders) */}
        <Grid size={{ xs: 12, md: 8 }}>
          
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              Recent Orders
            </Typography>
            
            {/* 4. Display Dynamic Orders */}
            {dashboardData.orders.length > 0 ? (
              <List>
                {dashboardData.orders.map((order) => (
                  <Box key={order.id}>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemText
                        primary={`Order ID: ${order.id}`}
                        // Display Items Summary
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              Total: ₱{Number(order.total).toFixed(2)}
                            </Typography>
                            {" | "}
                            {order.items.map(i => i.name).join(', ')}
                          </React.Fragment>
                        }
                      />
                      <Box display="flex" flexDirection="column" alignItems="flex-end">
                        <Chip 
                          label={order.status} 
                          color={getStatusColor(order.status)} 
                          size="small" 
                          sx={{ mb: 0.5 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {order.date}
                        </Typography>
                      </Box>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                No orders found. Time to order some food!
              </Typography>
            )}
          </Paper>

          {/* 5. Dynamic Stats Summary */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                <Typography variant="h6" color="primary.contrastText">Total Orders</Typography>
                <Typography variant="h4" color="primary.contrastText" sx={{ fontWeight: 'bold' }}>
                  {dashboardData.count}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
                <Typography variant="h6" color="secondary.contrastText">Lifetime Spend</Typography>
                <Typography variant="h4" color="secondary.contrastText" sx={{ fontWeight: 'bold' }}>
                  ₱{dashboardData.spend}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;