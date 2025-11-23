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

      {/* Search Bar Visual */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          bgcolor: 'primary.main', 
          borderRadius: 4,
          color: 'white'
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          What are you craving?
        </Typography>
        <TextField
          fullWidth
          placeholder="Search for restaurants or food..."
          variant="outlined"
          sx={{ 
            bgcolor: 'white', 
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'transparent' },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    </Box>
  );
};

export default HeroSection;