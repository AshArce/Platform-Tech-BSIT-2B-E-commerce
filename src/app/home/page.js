// src/app/home/page.js
'use client';

import React, { useState, useMemo } from 'react';
import { 
  Container, Typography, Box, Grid, Stack, Button, Card, CardActionArea, useTheme 
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import HeroSection from '../components/HeroSection'; 
import { useRouter } from 'next/navigation';

// 1. IMPORT CONTEXT (instead of data file)
import { useProducts } from '../context/ProductContext';

// Category Icons
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalBarIcon from '@mui/icons-material/LocalBar'; 
import RamenDiningIcon from '@mui/icons-material/RamenDining'; 
import RiceBowlIcon from '@mui/icons-material/RiceBowl'; 
import IcecreamIcon from '@mui/icons-material/Icecream'; 
import SearchIcon from '@mui/icons-material/Search'; 

export default function HomePage() {
  const router = useRouter();
  const theme = useTheme();
  
  // 2. GET PRODUCTS FROM CONTEXT
  const { allProducts } = useProducts();

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

  // 3. USE 'allProducts' FOR FILTERING
  const sections = useMemo(() => {
    // Safety check in case context hasn't loaded yet
    if (!allProducts) return { featured: [], bestSellers: [], topPicks: [], drinks: [], hotPicks: [] };

    return {
      featured: allProducts.filter(p => p.isFeatured).slice(0, 10), 
      bestSellers: allProducts.filter(p => p.isBestSeller).slice(0, 10),
      topPicks: allProducts.filter(p => p.isTopPick).slice(0, 10),
      drinks: allProducts.filter(p => p.category === 'Drinks').slice(0, 10),
      hotPicks: allProducts.filter(p => p.isHot).slice(0, 10),
    };
  }, [allProducts]);

  const categoryLinks = [
    { name: 'Explore', icon: <SearchIcon sx={{ fontSize: 40 }} />, path: '/explore' },
    { name: 'Pizza', icon: <LocalPizzaIcon sx={{ fontSize: 40 }} />, path: '/explore?category=Pizza' },
    { name: 'Burger', icon: <LunchDiningIcon sx={{ fontSize: 40 }} />, path: '/explore?category=Burger' },
    { name: 'Drinks', icon: <LocalBarIcon sx={{ fontSize: 40 }} />, path: '/explore?category=Drinks' },
    { name: 'Noodles', icon: <RamenDiningIcon sx={{ fontSize: 40 }} />, path: '/explore?category=Noodles' },
    { name: 'Rice', icon: <RiceBowlIcon sx={{ fontSize: 40 }} />, path: '/explore?category=Rice' },
    { name: 'Dessert', icon: <IcecreamIcon sx={{ fontSize: 40 }} />, path: '/explore?category=Dessert' },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
      
      <HeroSection />

      <Container maxWidth="lg" sx={{ mt: 4 }}>

        {sections.featured.length > 0 && (
          <ProductSlider 
            title="Featured Favorites" 
            products={sections.featured} 
            onProductClick={handleProductClick}
            onSeeAll={() => router.push('/explore')} 
          />
        )}

        {sections.bestSellers.length > 0 && (
          <ProductSlider 
            title="Best Sellers" 
            products={sections.bestSellers} 
            onProductClick={handleProductClick} 
          />
        )}

        {sections.topPicks.length > 0 && (
          <ProductSlider 
            title="Top Picks for You" 
            products={sections.topPicks} 
            onProductClick={handleProductClick} 
          />
        )}

        {sections.drinks.length > 0 && (
          <Box sx={{ my: 8, py: 6, bgcolor: 'background.paper', borderRadius: 4, px: { xs: 2, md: 4 }, mx: { xs: -2, md: 0 }, boxShadow: 1 }}>
            <SectionHeader title="Thirsty?" subtitle="Refresh yourself with our cool drinks" />
            <ProductSlider 
              products={sections.drinks} 
              onProductClick={handleProductClick} 
            />
          </Box>
        )}

        {sections.hotPicks.length > 0 && (
          <ProductSlider 
            title="Hot Picks 🔥" 
            products={sections.hotPicks} 
            onProductClick={handleProductClick} 
          />
        )}

        {/* Browse by Category */}
        <Box sx={{ mb: 8, mt: 8 }}>
          <SectionHeader title="Browse by Category" />
          <Grid container spacing={2}>
            {categoryLinks.map((cat) => (
              <Grid key={cat.name} size={{ xs: 6, sm: 4, md: 3 }}> 
                <Card 
                  sx={{ 
                    height: 140,
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)', bgcolor: 'primary.light', color: 'white' }
                  }}
                >
                  <CardActionArea 
                    onClick={() => router.push(cat.path)} 
                    sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 1, '& .MuiSvgIcon-root': { color: 'inherit' } }}>
                      {cat.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      {cat.name}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>

      <ProductModal 
        open={isModalOpen} 
        onClose={handleCloseModal} 
        product={selectedProduct} 
      />
    </Box>
  );
}

// --- SUB-COMPONENTS ---
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

const ProductSlider = ({ title, products, onProductClick, onSeeAll }) => (
  <Box sx={{ mb: 6 }}>
    {title && <SectionHeader title={title} onSeeAll={onSeeAll} />}
    
    <Stack 
      direction="row" 
      spacing={2} 
      sx={{ 
        overflowX: 'auto', 
        pb: 2, 
        px: 1,
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
        scrollSnapType: 'x mandatory',
      }}
    >
      {products.map((product) => (
        <Box 
          key={product.id} 
          sx={{ 
            minWidth: { xs: 260, md: 280 }, 
            scrollSnapAlign: 'start'
          }}
        >
          <ProductCard product={product} onProductClick={onProductClick} />
        </Box>
      ))}
    </Stack>
  </Box>
);