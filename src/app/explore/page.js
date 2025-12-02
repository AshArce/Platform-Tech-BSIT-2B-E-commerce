// src/app/explore/page.js
'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { 
  Container, Grid, Typography, TextField, InputAdornment, 
  Box, Chip, FormControl, Select, MenuItem, Snackbar, Alert, Stack, 
  Pagination, useTheme, useMediaQuery 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useCart } from '../context/CartContext';
import { useSearchParams } from 'next/navigation'; 

// 1. IMPORT CONTEXT
import { useProducts } from '../context/ProductContext';

const categories = ['All', 'Pizza', 'Burger', 'Drinks', 'Noodles', 'Rice', 'Dessert'];

function ExploreContent() {
  const { addToCart } = useCart();
  // 2. GET PRODUCTS FROM CONTEXT
  const { allProducts } = useProducts();
  
  const theme = useTheme();
  const searchParams = useSearchParams(); 

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); 
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg')); 

  let itemsPerPage = 20; 
  if (isDesktop) itemsPerPage = 20; 
  else if (isTablet) itemsPerPage = 21; 

  const [searchQuery, setSearchQuery] = useState('');
  
  const initialCategory = searchParams.get('category');
  const validCategory = categories.includes(initialCategory) ? initialCategory : 'All';
  
  const [selectedCategory, setSelectedCategory] = useState(validCategory);
  const [sortBy, setSortBy] = useState('popular');
  const [page, setPage] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState('');

  const handleProductClick = (product) => { setSelectedProduct(product); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setTimeout(() => setSelectedProduct(null), 200); };
  const handleAddToCart = (product) => { addToCart(product); setLastAddedItem(product.name); setOpenSnackbar(true); };

  useEffect(() => { setPage(1); }, [itemsPerPage]);

  const handleSearchChange = (e) => { setSearchQuery(e.target.value); setPage(1); };
  const handleCategoryClick = (cat) => { setSelectedCategory(cat); setPage(1); };
  const handlePageChange = (event, value) => { setPage(value); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // 3. UPDATE FILTER LOGIC TO USE allProducts
  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];

    let result = [...allProducts]; // Use dynamic list

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery));
    }
    if (selectedCategory !== 'All') result = result.filter(p => p.category === selectedCategory);
    switch (sortBy) {
      case 'lowToHigh': result.sort((a, b) => a.price - b.price); break;
      case 'highToLow': result.sort((a, b) => b.price - a.price); break;
      case 'aToZ': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return result;
  }, [searchQuery, selectedCategory, sortBy, allProducts]); // Add allProducts dependency

  const count = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Explore Menu</Typography>

      <Box sx={{ mb: 4, position: 'relative', bgcolor: 'background.default', zIndex: 10, py: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField fullWidth placeholder="Search..." variant="outlined" size="small" value={searchQuery} onChange={handleSearchChange} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>) }} sx={{ bgcolor: 'background.paper' }} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth size="small" sx={{ bgcolor: 'background.paper' }}>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} displayEmpty startAdornment={<InputAdornment position="start"><FilterListIcon fontSize="small" /></InputAdornment>}>
                <MenuItem value="popular">Sort By: Popularity</MenuItem>
                <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
                <MenuItem value="highToLow">Price: High to Low</MenuItem>
                <MenuItem value="aToZ">Name: A to Z</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', md: 'center' }} sx={{ mt: 2, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
          {categories.map((cat) => (
            <Chip key={cat} label={cat} clickable color={selectedCategory === cat ? "primary" : "default"} onClick={() => handleCategoryClick(cat)} sx={{ fontWeight: selectedCategory === cat ? 'bold' : 'normal', fontSize: '0.9rem' }} />
          ))}
        </Stack>
      </Box>

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>Showing {paginatedProducts.length} results</Typography>

      {paginatedProducts.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {paginatedProducts.map((product) => (
              <Grid key={product.id} size={{ xs: 6, md: 4, lg: 3 }}>
                <ProductCard product={product} onProductClick={handleProductClick} />
              </Grid>
            ))}
          </Grid>
          {count > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination count={count} page={page} onChange={handlePageChange} color="primary" size="large" siblingCount={0} />
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}><Typography variant="h6" color="text.secondary">No items found</Typography></Box>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }} variant="filled">{lastAddedItem} added to cart!</Alert>
      </Snackbar>

      <ProductModal open={isModalOpen} onClose={handleCloseModal} product={selectedProduct} />
    </Container>
  );
}

export default function ExplorePageWrapper() {
  return (
    <Suspense fallback={<Typography>Loading...</Typography>}>
      <ExploreContent />
    </Suspense>
  );
}