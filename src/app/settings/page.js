// src/app/settings/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Paper, TextField, Button, Avatar, 
  Grid, Alert, Divider 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const { currentUser, updateProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  // Load current user data
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '', // Ensure phone is handled
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // Validation: If changing password, ensure they match
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        setStatus({ type: 'error', message: 'New passwords do not match' });
        return;
    }

    const payload = {
        id: currentUser.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        currentPassword: formData.currentPassword, // Required if changing password
        newPassword: formData.newPassword
    };

    const result = await updateProfile(payload);

    if (result.success) {
        setStatus({ type: 'success', message: 'Profile updated successfully!' });
        // Clear sensitive fields
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } else {
        setStatus({ type: 'error', message: result.message });
    }
  };

  if (!currentUser) return null;

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

        {status.message && (
            <Alert severity={status.type} sx={{ mb: 3 }}>{status.message}</Alert>
        )}

        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Personal Information</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} />
                </Grid>
                 <Grid item xs={12}>
                    <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Security (Optional)</Typography>
                </Grid>
                
                <Grid item xs={12}>
                    <TextField fullWidth type="password" label="Current Password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} helperText="Required only if changing password" />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth type="password" label="New Password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth type="password" label="Confirm New Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </Grid>

                <Grid item xs={12} mt={2}>
                    <Button type="submit" variant="contained" size="large" fullWidth startIcon={<SaveIcon />}>
                        Save Changes
                    </Button>
                </Grid>
            </Grid>
        </form>

      </Paper>
    </Container>
  );
}