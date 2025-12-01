// src/app/home/page.js
'use client';

import React, { useState, useMemo } from 'react';
import { Container, Typography, Box, Grid, Stack, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import HeroSection from '../components/HeroSection'; 
import { products } from '../../data/products';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // --- MODAL STATE (Same as Explore) ---
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 200);
  };

  // --- DATA FILTERING ---
  // We use useMemo to avoid re-filtering on every render
  const sections = useMemo(() => {
    return {
      featured: products.filter(p => p.isFeatured).slice(0, 4), // Limit to 4
      bestSellers: products.filter(p => p.isBestSeller).slice(0, 10),
      topPicks: products.filter(p => p.isTopPick).slice(0, 10),
      drinks: products.filter(p => p.category === 'Drinks').slice(0, 10), // "Thirsty?"
      hotPicks: products.filter(p => p.isHot).slice(0, 10), // "Hot Picks"
    };
  }, []);

return (
    // CHANGE #fafafa TO 'background.default'
    <Box sx={{ bgcolor: 'background.paper', // <--- This switches automatically!
    pt: { xs: 8, md: 12 } }}>
      
      {/* 1. HERO SECTION */}
      <HeroSection />

      <Container maxWidth="lg" sx={{ mt: 4 }}>

        {/* 2. FEATURED SECTION (Grid Layout - The "Face" of the menu) */}
        {sections.featured.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <SectionHeader title="Featured Favorites" onSeeAll={() => router.push('/explore')} />
            <Grid container spacing={3}>
              {sections.featured.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <ProductCard product={product} onProductClick={handleProductClick} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* 3. BEST SELLERS (Horizontal Scroll) */}
        {sections.bestSellers.length > 0 && (
          <ProductSlider 
            title="Best Sellers" 
            products={sections.bestSellers} 
            onProductClick={handleProductClick} 
          />
        )}

        {/* 4. TOP PICKS (Horizontal Scroll) */}
        {sections.topPicks.length > 0 && (
          <ProductSlider 
            title="Top Picks for You" 
            products={sections.topPicks} 
            onProductClick={handleProductClick} 
          />
        )}

        {/* 5. THIRSTY? (Drinks Category) */}
        {sections.drinks.length > 0 && (
          <Box sx={{ my: 8, py: 6, bgcolor: '#E3F2FD', borderRadius: 4, px: { xs: 2, md: 4 }, mx: { xs: -2, md: 0 } }}>
            <SectionHeader title="Thirsty?" subtitle="Refresh yourself with our cool drinks" />
            <ProductSlider 
              products={sections.drinks} 
              onProductClick={handleProductClick} 
              bgTransparent 
            />
          </Box>
        )}

        {/* 6. HOT PICKS (Horizontal Scroll) */}
        {sections.hotPicks.length > 0 && (
          <ProductSlider 
            title="Hot Picks 🔥" 
            products={sections.hotPicks} 
            onProductClick={handleProductClick} 
          />
        )}

      </Container>

      {/* MODAL */}
      <ProductModal 
        open={isModalOpen} 
        onClose={handleCloseModal} 
        product={selectedProduct} 
      />
    </Box>
  );
}

// --- SUB-COMPONENTS ---

// 1. Section Header (Reusable)
const SectionHeader = ({ title, subtitle, onSeeAll }) => (
  <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={3}>
    <Box>
      <Typography variant="h5" fontWeight="800" sx={{ letterSpacing: '-0.5px' }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
    {onSeeAll && (
      <Button 
        endIcon={<ArrowForwardIcon />} 
        onClick={onSeeAll}
        sx={{ fontWeight: 'bold', textTransform: 'none' }}
      >
        See All
      </Button>
    )}
  </Box>
);

// 2. Product Slider (Reusable Horizontal Scroll)
const ProductSlider = ({ title, products, onProductClick, bgTransparent = false }) => (
  <Box sx={{ mb: 6 }}>
    {title && <SectionHeader title={title} />}
    
    <Stack 
      direction="row" 
      spacing={2} 
      sx={{ 
        overflowX: 'auto', 
        pb: 2, 
        px: 1,
        // Hide Scrollbar for cleaner look
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
        // Scroll Snap for better touch feel
        scrollSnapType: 'x mandatory',
      }}
    >
      {products.map((product) => (
        <Box 
          key={product.id} 
          sx={{ 
            minWidth: { xs: 260, md: 280 }, // Fixed width for slider cards
            scrollSnapAlign: 'start'
          }}
        >
          <ProductCard product={product} onProductClick={onProductClick} />
        </Box>
      ))}
    </Stack>
  </Box>
);