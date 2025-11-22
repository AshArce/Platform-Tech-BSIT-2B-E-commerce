// src/app/explore/page.js
'use client';

import React, { useState, useMemo } from 'react';
import { 
  Container, Grid, Typography, TextField, InputAdornment, 
  Box, Chip, FormControl, Select, MenuItem, Snackbar, Alert, Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ProductCard from '../components/ProductCard';
import { products } from '../../data/products';
import { useCart } from '../context/CartContext';

// This is the variable causing the issue - it must only appear ONCE
const categories = ['All', 'Pizza', 'Burger', 'Drinks', 'Noodles', 'Rice', 'Dessert'];

export default function ExplorePage() {
  const { addToCart } = useCart();
  
  // States for UI Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular'); // popular, lowToHigh, highToLow, aToZ
  
  // Snackbar State
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product);
    setLastAddedItem(product.name);
    setOpenSnackbar(true);
  };

  // --- FILTERING & SORTING LOGIC ---
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search Filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 3. Sorting Logic
    switch (sortBy) {
      case 'lowToHigh':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'highToLow':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'aToZ':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Explore Menu
      </Typography>

      {/* CONTROLS SECTION */}
      <Box sx={{ mb: 4, position: 'sticky', top: 70, bgcolor: '#fafafa', zIndex: 10, py: 2 }}>
        
        <Grid container spacing={2} alignItems="center">
          {/* Search Bar */}
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              placeholder="Search for food (e.g., 'Pizza')"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'white' }}
            />
          </Grid>

          {/* Sort Dropdown */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                displayEmpty
                startAdornment={<InputAdornment position="start"><FilterListIcon fontSize="small" /></InputAdornment>}
              >
                <MenuItem value="popular">Sort By: Popularity</MenuItem>
                <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
                <MenuItem value="highToLow">Price: High to Low</MenuItem>
                <MenuItem value="aToZ">Name: A to Z</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Categories Chips */}
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            mt: 2, 
            overflowX: 'auto', 
            pb: 1,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none'
          }}
        >
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              color={selectedCategory === cat ? "primary" : "default"} 
              onClick={() => setSelectedCategory(cat)}
              sx={{ 
                fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                fontSize: '0.9rem'
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* RESULTS GRID */}
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredProducts.length} results
      </Typography>

      {filteredProducts.length > 0 ? (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No items found matching "{searchQuery}"
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try checking your spelling or use a different category.
          </Typography>
        </Box>
      )}

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }} variant="filled">
          {lastAddedItem} added to cart!
        </Alert>
      </Snackbar>

    </Container>
  );
}