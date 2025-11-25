// src/app/components/HeroSection.jsx
'use client';

import React from 'react';
import { Box, Typography, TextField, InputAdornment, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const HeroSection = () => {
  return (
    <Box sx={{ pt: 5, mb: 4, textAlign: 'center' }}>
      {/* Brand Title */}
      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.text' }}>
        E-BIKE EXPRESS
      </Typography>
      
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Delicious food, delivered at e-bike speed.
      </Typography>
    </Box>
  );
};

export default HeroSection;