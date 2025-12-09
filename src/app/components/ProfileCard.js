// src/app/components/ProfileCard.js
'use client';

import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Divider, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';

// 1. Import Auth Hooks needed for logout logic
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const ProfileCard = ({ user }) => {
  // 2. Get logout function and router
  const { logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  // 3. Handle Logout Click inside the card
  const handleLogout = () => {
    logout(); 
    router.push('/'); 
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 4, overflow: 'visible', mt: 4, position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <Avatar
          alt={user.name}
          src={user.avatarUrl}
          sx={{ width: 80, height: 80, border: '4px solid white', boxShadow: 2, bgcolor: 'primary.main', fontSize: '1.5rem' }}
        >
          {getInitials(user.name)}
        </Avatar>
      </Box>

      <CardContent sx={{ pt: 7, pb: 3, px: 3, textAlign: 'center' }}>
        <Typography variant="h5" component="div" fontWeight="bold">
          {user.name}
        </Typography>
        <Typography sx={{ mb: 2.5 }} color="text.secondary" variant="body2">
          {user.role}
        </Typography>

        <Divider light sx={{ my: 2 }} />

        <Box display="flex" alignItems="center" justifyContent="center" mb={1.5}>
          <EmailIcon color="action" sx={{ mr: 1.5, fontSize: 20 }} />
          <Typography variant="body2" color="text.primary">
            {user.email}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center">
          <EventNoteIcon color="action" sx={{ mr: 1.5, fontSize: 20 }} />
          <Typography variant="body2" color="text.primary">
            Member Since: {user.memberSince}
          </Typography>
        </Box>

        {/* 4. NEW APPEALING LOGOUT BUTTON */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
           <Button 
             variant="text" 
             color="error" 
             size="small"
             startIcon={<LogoutIcon fontSize="small" />}
             onClick={handleLogout}
             sx={{ 
               textTransform: 'none', 
               fontWeight: 'bold',
               borderRadius: 2,
               px: 2,
               '&:hover': { bgcolor: 'error.lighter' }
             }}
           >
             Sign Out
           </Button>
        </Box>

      </CardContent>
    </Card>
  );
};

export default ProfileCard;