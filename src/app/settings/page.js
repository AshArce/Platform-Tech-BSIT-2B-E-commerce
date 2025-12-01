// src/app/settings/page.js
'use client';

import React, { useState } from 'react';
import { 
  Box, Container, Typography, Paper, List, ListItem, ListItemText, 
  ListItemIcon, ListItemSecondaryAction, Switch, Divider, Button, IconButton,
  ListItemButton // 1. Added this import
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import HelpIcon from '@mui/icons-material/Help';
import EmailIcon from '@mui/icons-material/Email';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);

  // Handlers
  const handleBack = () => router.back();
  const handleEditLocation = () => console.log('Edit location clicked');
  const handleNavClick = (route) => console.log(`Maps to ${route}`);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        
        {/* HEADER */}
        <Box display="flex" alignItems="center" mb={4}>
          <IconButton onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" fontWeight="bold">
            Settings
          </Typography>
        </Box>

        {/* SECTION 1: General Settings */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, ml: 1, textTransform: 'uppercase', fontWeight: 'bold' }}>
          General
        </Typography>
        
        <Paper elevation={0} sx={{ borderRadius: 3, mb: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
          <List disablePadding>
            
            {/* Location Settings */}
            <ListItem sx={{ py: 2 }}>
              <ListItemIcon>
                <LocationOnIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Location Settings" 
                secondary="Batangas City, Philippines" 
                primaryTypographyProps={{ fontWeight: 'medium' }}
              />
              <Button variant="outlined" size="small" onClick={handleEditLocation} sx={{ borderRadius: 2 }}>
                Change
              </Button>
            </ListItem>

            <Divider variant="middle" />

            {/* Push Notifications */}
            <ListItem sx={{ py: 2 }}>
              <ListItemIcon>
                <NotificationsIcon color="action" />
              </ListItemIcon>
              <ListItemText 
                primary="Push Notifications" 
                secondary="Receive delivery updates on your device"
                primaryTypographyProps={{ fontWeight: 'medium' }}
              />
              <ListItemSecondaryAction>
                <Switch 
                  edge="end" 
                  checked={pushNotifications} 
                  onChange={(e) => setPushNotifications(e.target.checked)} 
                />
              </ListItemSecondaryAction>
            </ListItem>

          </List>
        </Paper>

        {/* SECTION 2: Support */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, ml: 1, textTransform: 'uppercase', fontWeight: 'bold' }}>
          Support & Legal
        </Typography>

        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
          <List disablePadding>
            
            {/* 2. REPLACED <ListItem button> with <ListItemButton> */}
            
            {/* Terms of Service */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavClick('/terms')} sx={{ py: 2 }}>
                <ListItemIcon><DescriptionIcon color="action" /></ListItemIcon>
                <ListItemText primary="Terms of Service" />
                <ChevronRightIcon color="action" />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />

            {/* Data Policy */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavClick('/privacy')} sx={{ py: 2 }}>
                <ListItemIcon><PrivacyTipIcon color="action" /></ListItemIcon>
                <ListItemText primary="Data Policy" />
                <ChevronRightIcon color="action" />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />

            {/* Help / FAQ */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavClick('/help')} sx={{ py: 2 }}>
                <ListItemIcon><HelpIcon color="action" /></ListItemIcon>
                <ListItemText primary="Help / FAQ" />
                <ChevronRightIcon color="action" />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />

            {/* Contact Us */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavClick('/contact')} sx={{ py: 2 }}>
                <ListItemIcon><EmailIcon color="action" /></ListItemIcon>
                <ListItemText primary="Contact Us" />
                <ChevronRightIcon color="action" />
              </ListItemButton>
            </ListItem>

          </List>
        </Paper>

      </Container>
    </Box>
  );
}