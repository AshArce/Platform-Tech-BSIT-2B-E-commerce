// src/app/settings/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Paper, List, ListItem, ListItemText, 
  ListItemIcon, ListItemSecondaryAction, Switch, Divider, Button, IconButton,
  ListItemButton,
  // Dialog components for popups
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../context/AuthContext';

// IMPORT NEW SEPARATED COMPONENTS
import TermsDialog from '../components/TermsDialog'; 
import PrivacyDialog from '../components/PrivacyDialog';

export default function SettingsPage() {
  const router = useRouter();
  
  // STATE VARIABLES
  const [pushNotifications, setPushNotifications] = useState(true);
  
  // Location Dialog State
  const [location, setLocation] = useState("Batangas City, Philippines"); 
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false); 
  const [tempLocation, setTempLocation] = useState(""); 
  
  // Terms of Service Dialog State
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Data Policy Dialog State
  const [isDataPolicyOpen, setIsDataPolicyOpen] = useState(false);

  // --- HANDLERS ---
  const handleBack = () => router.back();
  const handleNavClick = (route) => console.log(`Maps to ${route}`);

  // Location Dialog Handlers
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
  
  // Terms of Service Dialog Handlers
  const handleOpenTerms = () => {
    setIsTermsOpen(true);
  };

  const handleCloseTerms = () => {
    setIsTermsOpen(false);
  };

  // Data Policy Dialog Handlers
  const handleOpenDataPolicy = () => {
    setIsDataPolicyOpen(true);
  };

  const handleCloseDataPolicy = () => {
    setIsDataPolicyOpen(false);
  };


  return (
    <Container maxWidth="sm" sx={{ py: 4, pb: 10 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>Account Settings</Typography>

      <Paper sx={{ p: 4, borderRadius: 2 }}>
        
        {/* Avatar Section */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Avatar 
                src={currentUser.avatarUrl} 
                sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main', fontSize: 32 }}
            >
                {currentUser.name ? currentUser.name[0] : 'U'}
            </Avatar>
            <Typography variant="h6">{currentUser.name}</Typography>
            <Typography variant="body2" color="text.secondary">{currentUser.role}</Typography>
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
                secondary={location}
                primaryTypographyProps={{ fontWeight: 'medium' }}
              />
              <Button 
                variant="outlined" 
                size="small" 
                onClick={handleOpenLocationDialog} // Use open handler
                sx={{ borderRadius: 2 }}
              >
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
            
            {/* Terms of Service (Triggers Full Screen Modal) */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpenTerms} sx={{ py: 2 }}>
                <ListItemIcon><DescriptionIcon color="action" /></ListItemIcon>
                <ListItemText primary="Terms of Service" />
                <ChevronRightIcon color="action" />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />

            {/* Data Policy (Triggers Full Screen Modal) */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpenDataPolicy} sx={{ py: 2 }}>
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

        {/* --- DIALOG 1: EDIT LOCATION POPUP (SMALL DIALOG) --- */}
        <Dialog open={isLocationDialogOpen} onClose={handleCloseLocationDialog} fullWidth maxWidth="xs">
          <DialogTitle>Update Location</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Enter new location"
              type="text"
              fullWidth
              variant="outlined"
              value={tempLocation}
              onChange={(e) => setTempLocation(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLocationDialog} color="inherit">Cancel</Button>
            <Button onClick={handleSaveLocation} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* --- DIALOG 2: TERMS OF SERVICE (SEPARATED COMPONENT) --- */}
        <TermsDialog open={isTermsOpen} onClose={handleCloseTerms} />

        {/* --- DIALOG 3: DATA POLICY (SEPARATED COMPONENT) --- */}
        <PrivacyDialog open={isDataPolicyOpen} onClose={handleCloseDataPolicy} />
        
      </Container>
    </Box>
  );
}