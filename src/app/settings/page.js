// src/app/settings/page.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { 
  Box, Container, Typography, Paper, List, ListItem, ListItemText, 
  ListItemIcon, ListItemSecondaryAction, Switch, Divider, Button, 
  ListItemButton, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
} from '@mui/material';

// 2. IMPORT THE ICONS USED
import SaveIcon from '@mui/icons-material/Save';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DescriptionIcon from '@mui/icons-material/Description';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import HelpIcon from '@mui/icons-material/Help';
import EmailIcon from '@mui/icons-material/Email';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useAuth } from '../context/AuthContext';
import TermsDialog from '../components/TermsDialog'; 
import PrivacyDialog from '../components/PrivacyDialog';

export default function SettingsPage() {
  const router = useRouter();
  
  // 3. DEFINE THE USER (Mocking it here if useAuth fails, but usually you destructure it)
  // const { user } = useAuth(); <--- This is how you likely handle it
  // For safety, I'll default it so the page doesn't crash if auth fails
  const { user: currentUser = { name: 'User', role: 'Admin', avatarUrl: '' } } = useAuth() || {};

  const [pushNotifications, setPushNotifications] = useState(true);
  
  // Location Dialog State
  const [location, setLocation] = useState("Batangas City, Philippines"); 
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false); 
  const [tempLocation, setTempLocation] = useState(""); 
  
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isDataPolicyOpen, setIsDataPolicyOpen] = useState(false);

  // --- HANDLERS ---
  const handleBack = () => router.back();
  const handleNavClick = (route) => console.log(`Maps to ${route}`);

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
  
  const handleOpenTerms = () => setIsTermsOpen(true);
  const handleCloseTerms = () => setIsTermsOpen(false);
  const handleOpenDataPolicy = () => setIsDataPolicyOpen(true);
  const handleCloseDataPolicy = () => setIsDataPolicyOpen(false);

  return (
    <Container maxWidth="sm" sx={{ py: 4, pb: 10 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>Account Settings</Typography>

      {/* OPENING MAIN PAPER */}
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
                onClick={handleOpenLocationDialog} 
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
            
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpenTerms} sx={{ py: 2 }}>
                <ListItemIcon><DescriptionIcon color="action" /></ListItemIcon>
                <ListItemText primary="Terms of Service" />
                <ChevronRightIcon color="action" />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem disablePadding>
              <ListItemButton onClick={handleOpenDataPolicy} sx={{ py: 2 }}>
                <ListItemIcon><PrivacyTipIcon color="action" /></ListItemIcon>
                <ListItemText primary="Data Policy" />
                <ChevronRightIcon color="action" />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavClick('/help')} sx={{ py: 2 }}>
                <ListItemIcon><HelpIcon color="action" /></ListItemIcon>
                <ListItemText primary="Help / FAQ" />
                <ChevronRightIcon color="action" />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavClick('/contact')} sx={{ py: 2 }}>
                <ListItemIcon><EmailIcon color="action" /></ListItemIcon>
                <ListItemText primary="Contact Us" />
                <ChevronRightIcon color="action" />
              </ListItemButton>
            </ListItem>

          </List>
        </Paper>

      {/* 4. CLOSING THE MAIN PAPER HERE - THIS WAS MISSING */}
      </Paper> 

      {/* --- DIALOGS (Keep these outside the main Paper but inside Container) --- */}
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

      <TermsDialog open={isTermsOpen} onClose={handleCloseTerms} />

      <PrivacyDialog open={isDataPolicyOpen} onClose={handleCloseDataPolicy} />
      
    </Container>
  );
}