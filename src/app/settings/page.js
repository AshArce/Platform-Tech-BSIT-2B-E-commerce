// src/app/settings/page.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { 
  Box, Container, Typography, Paper, List, ListItem, ListItemText, 
  ListItemIcon, ListItemSecondaryAction, Switch, Divider, Button, 
  ListItemButton, Avatar, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, IconButton, Stack
} from '@mui/material';

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DescriptionIcon from '@mui/icons-material/Description';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import HelpIcon from '@mui/icons-material/Help';
import EmailIcon from '@mui/icons-material/Email';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useAuth } from '../context/AuthContext';
import TermsDialog from '../components/TermsDialog'; 
import PrivacyDialog from '../components/PrivacyDialog';

export default function SettingsPage() {
  const router = useRouter();
  const { currentUser, logout } = useAuth(); // Get logout from context

  // Default Fallback in case context is loading
  const user = currentUser || { name: 'Guest', role: 'Visitor', avatarUrl: '' };

  const [pushNotifications, setPushNotifications] = useState(true);
  
  // Location Dialog State
  const [location, setLocation] = useState("Biringan City, Philippines"); 
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false); 
  const [tempLocation, setTempLocation] = useState(""); 
  
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isDataPolicyOpen, setIsDataPolicyOpen] = useState(false);

  // --- HANDLERS ---
  const handleNavClick = (route) => {
    // Navigate to actual routes
    router.push(route);
  };

  const handleLogout = () => {
    if (logout) logout();
    router.push('/');
  };

  const handleOpenLocationDialog = () => {
    setTempLocation(location); 
    setIsLocationDialogOpen(true);     
  };

  const handleCloseLocationDialog = () => {
    setIsLocationDialogOpen(false);    
  };

  const handleSaveLocation = () => {
    setLocation(tempLocation); 
    setIsLocationDialogOpen(false);    
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, pb: 10 }}>
      
      {/* Header with Back Button */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => router.back()} sx={{ mr: 1 }}>
            <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" fontWeight="bold">Settings</Typography>
      </Box>

      {/* --- PROFILE CARD SECTION --- */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 4, mb: 4, background: 'linear-gradient(135deg, #FFC107 0%, #FF9800 100%)', color: 'white' }}>
        <Box display="flex" alignItems="center" gap={2}>
            <Avatar 
                src={user.avatarUrl} 
                sx={{ width: 70, height: 70, bgcolor: 'white', color: 'primary.main', fontSize: 30, fontWeight: 'bold', border: '2px solid white' }}
            >
                {user.name ? user.name[0].toUpperCase() : 'U'}
            </Avatar>
            <Box flexGrow={1}>
                <Typography variant="h6" fontWeight="bold">{user.name}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>{user.role}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>{user.email || 'No email linked'}</Typography>
            </Box>
        </Box>
      </Paper>

      {/* --- SETTINGS LIST --- */}
      <Paper elevation={1} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
        <List disablePadding>
          
          {/* SECTION HEADER */}
          <Box sx={{ bgcolor: '#f5f5f5', px: 2, py: 1 }}>
            <Typography variant="caption" fontWeight="bold" color="text.secondary">PREFERENCES</Typography>
          </Box>

          {/* Location Settings */}
          <ListItem sx={{ py: 2 }}>
            <ListItemIcon>
              <LocationOnIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Delivery Location" 
              secondary={location}
              primaryTypographyProps={{ fontWeight: 'medium' }}
            />
            <Button variant="text" size="small" onClick={handleOpenLocationDialog}>
              Edit
            </Button>
          </ListItem>

          <Divider variant="inset" component="li" />

          {/* Push Notifications */}
          <ListItem sx={{ py: 2 }}>
            <ListItemIcon>
              <NotificationsIcon color="action" />
            </ListItemIcon>
            <ListItemText 
              primary="Notifications" 
              secondary="Order updates & promos"
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

          {/* SECTION HEADER */}
          <Box sx={{ bgcolor: '#f5f5f5', px: 2, py: 1 }}>
            <Typography variant="caption" fontWeight="bold" color="text.secondary">SUPPORT & LEGAL</Typography>
          </Box>

          <ListItemButton onClick={() => setIsTermsOpen(true)} sx={{ py: 2 }}>
            <ListItemIcon><DescriptionIcon color="action" /></ListItemIcon>
            <ListItemText primary="Terms of Service" />
            <ChevronRightIcon color="action" fontSize="small" />
          </ListItemButton>
          
          <Divider variant="inset" component="li" />

          <ListItemButton onClick={() => setIsDataPolicyOpen(true)} sx={{ py: 2 }}>
            <ListItemIcon><PrivacyTipIcon color="action" /></ListItemIcon>
            <ListItemText primary="Privacy Policy" />
            <ChevronRightIcon color="action" fontSize="small" />
          </ListItemButton>

          <Divider variant="inset" component="li" />

          <ListItemButton onClick={() => handleNavClick('/help')} sx={{ py: 2 }}>
            <ListItemIcon><HelpIcon color="action" /></ListItemIcon>
            <ListItemText primary="Help Center" />
            <ChevronRightIcon color="action" fontSize="small" />
          </ListItemButton>

          <Divider variant="inset" component="li" />

          <ListItemButton onClick={() => handleNavClick('/contact')} sx={{ py: 2 }}>
            <ListItemIcon><EmailIcon color="action" /></ListItemIcon>
            <ListItemText primary="Contact Us" />
            <ChevronRightIcon color="action" fontSize="small" />
          </ListItemButton>

        </List>
      </Paper>

      {/* LOGOUT BUTTON */}
      <Button 
        variant="outlined" 
        color="error" 
        fullWidth 
        size="large" 
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{ mt: 4, borderRadius: 2, py: 1.5, fontWeight: 'bold' }}
      >
        Log Out
      </Button>

      {/* --- DIALOGS --- */}
      <Dialog open={isLocationDialogOpen} onClose={handleCloseLocationDialog} fullWidth maxWidth="xs">
        <DialogTitle>Update Location</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter new delivery area"
            type="text"
            fullWidth
            variant="outlined"
            value={tempLocation}
            onChange={(e) => setTempLocation(e.target.value)}
            helperText="Drivers will use this as default."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLocationDialog} color="inherit">Cancel</Button>
          <Button onClick={handleSaveLocation} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reusing your existing components */}
      <TermsDialog open={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyDialog open={isDataPolicyOpen} onClose={() => setIsDataPolicyOpen(false)} />
      
    </Container>
  );
}