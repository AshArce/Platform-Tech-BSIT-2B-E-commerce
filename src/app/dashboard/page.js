// src/app/dashboard/page.js
'use client';

import React, { useEffect } from 'react';
import { Container, Typography, Grid, Paper, Box, List, ListItem, ListItemText, Chip, Divider } from '@mui/material';
import ProfileCard from '../components/ProfileCard';
import { recentOrders } from '../../data/dashboardData'; 

// 1. Import Auth Hooks
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered': return 'success';
    case 'Cooking': return 'warning'; 
    case 'Processing': return 'info';
    default: return 'default';
  }
};

const DashboardPage = () => {
  // 2. Get Current User
  const { currentUser } = useAuth(); 
  const router = useRouter();

  // 3. Protect Route
  useEffect(() => {
    if (!currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  if (!currentUser) return null; 

  return (
    <Container maxWidth="lg" sx={{py: 4}}>
      <Typography variant="h3" component="h1" gutterBottom>
        My Dashboard
      </Typography>

      <Grid container spacing={3}>
        
        {/* GRID UPDATE: Left Column (Profile) */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* 4. USE DYNAMIC USER */}
          <ProfileCard user={currentUser} />
        </Grid>

        {/* GRID UPDATE: Right Column (Orders) */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              Recent Orders
            </Typography>
            <List>
              {recentOrders.map((order) => (
                <Box key={order.id}>
                  <ListItem disablePadding sx={{ py: 1 }}>
                    <ListItemText
                      primary={`Order ID: ${order.id}`}
                      secondary={`Total: $${order.total.toFixed(2)} | Items: ${order.items.join(', ')}`}
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
          </Paper>

          {/* Stats Summary */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                <Typography variant="h6" color="primary.contrastText">Total Orders</Typography>
                <Typography variant="h4" color="primary.contrastText" sx={{ fontWeight: 'bold' }}>{recentOrders.length}</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
                <Typography variant="h6" color="secondary.contrastText">Lifetime Spend</Typography>
                <Typography variant="h4" color="secondary.contrastText" sx={{ fontWeight: 'bold' }}>$45.99</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;