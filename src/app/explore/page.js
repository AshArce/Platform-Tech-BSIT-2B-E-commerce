// src/app/explore/page.js
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Container, Grid, Typography, TextField, InputAdornment, 
  Box, Chip, FormControl, Select, MenuItem, Snackbar, Alert, Stack, 
  Pagination, useTheme, useMediaQuery // 1. Import Hooks
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ProductCard from '../components/ProductCard';
import { products } from '../../data/products';
import { useCart } from '../context/CartContext';

const categories = ['All', 'Pizza', 'Burger', 'Drinks', 'Noodles', 'Rice', 'Dessert'];

export default function ExplorePage() {
  const { addToCart } = useCart();
  const theme = useTheme();

  // 2. Detect Screen Size
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // Large screens
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg')); // Medium screens

  // 3. Dynamic Items Per Page Logic
  let itemsPerPage = 20; // Default (Mobile)
  
  if (isDesktop) {
    itemsPerPage = 20; // Desktop: 4 per row * 5 rows = 20
  } else if (isTablet) {
    itemsPerPage = 21; // Tablet: 3 per row * 7 rows = 21 (Odd number, perfectly fills rows)
  }
  // Mobile falls back to 20: 2 per row * 10 rows

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [page, setPage] = useState(1);
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState('');

  // Reset page if screen size changes (to prevent viewing empty pages)
  useEffect(() => {
    setPage(1);
  }, [itemsPerPage]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setLastAddedItem(product.name);
    setOpenSnackbar(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); 
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setPage(1); 
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- FILTERING & SORTING ---
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

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

  // 4. USE DYNAMIC 'itemsPerPage' FOR PAGINATION
  const count = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Explore Menu
      </Typography>

      {/* CONTROLS */}
      <Box sx={{ mb: 4, position: 'relative', top: 70, bgcolor: '#fafafa', zIndex: 10, py: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              placeholder="Search for food (e.g., 'Pizza')"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
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

        <Stack 
          direction="row" 
          spacing={1} 
          // 👇 UPDATE: Center on larger screens, Start on mobile (for scrolling safety)
          justifyContent={{ xs: 'flex-start', md: 'center' }}
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
              onClick={() => handleCategoryClick(cat)}
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
        Showing {paginatedProducts.length} results (Page {page} of {count})
      </Typography>

      {paginatedProducts.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {paginatedProducts.map((product) => (
              <Grid 
                key={product.id} 
                // 5. RESPONSIVE GRID LAYOUT
                size={{ 
                  xs: 6,  // Mobile: 2 items per row
                  md: 4,  // Tablet: 3 items per row
                  lg: 3   // Desktop: 4 items per row
                }}
              >
                <ProductCard 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {count > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination 
                count={count} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
                // Hide Previous/Next on very small screens if needed, 
                // or use siblingCount={0} to save space
                siblingCount={0} 
              />
            </Box>
          )}
        </>
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