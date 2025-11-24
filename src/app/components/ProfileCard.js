// src/app/components/ProfileCard.js

import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import EventNoteIcon from '@mui/icons-material/EventNote';

const ProfileCard = ({ user }) => {
  return (
    <Card sx={{ p: 2, textAlign: 'center', height: '100%' }}>
      <CardContent>
        <Avatar 
          alt={user.name} 
          src={user.avatarUrl} 
          sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}
        />
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {user.name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3 }}>
          Frontend Architect
        </Typography>
        
        <Divider sx={{ my: 2 }} />

        <Box sx={{ textAlign: 'left' }}>
          <Box display="flex" alignItems="center" mb={1}>
            <EmailIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body2">{user.email}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <EventNoteIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body2">Member Since: {user.memberSince}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default ProfileCard;