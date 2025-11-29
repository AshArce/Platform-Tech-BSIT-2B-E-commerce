'use client';
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  Paper
} from '@mui/material';
import { 
  ElectricBike, 
  Storefront, 
  EmojiEmotions, 
  ArrowForward 
} from '@mui/icons-material';

export default function AboutPage() {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
      
      {/* 1. HERO SECTION */}
      <Box 
        sx={{ 
          bgcolor: 'white', 
          pt: { xs: 8, md: 12 }, 
          pb: { xs: 8, md: 10 },
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              color: 'text.primary',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' } 
            }}
          >
            Delivering Delicious and Fast.
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary', 
              maxWidth: '800px', 
              mx: 'auto', 
              lineHeight: 1.6,
              fontWeight: 400,
              mb: 4
            }}
          >
             E-Bike Express is redefining delivery with an eco-friendly fleet. 
             We connect you to the flavors you love, faster and greener.
          </Typography>
          
          <Button 
           href="/explore"
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            Explore Menu
          </Button>
        </Container>
      </Box>

      {/* 2. VALUES GRID (Floating Cards) */}
      <Container maxWidth="lg" sx={{ mt: -6, mb: 12, position: 'relative', zIndex: 2 }}>
        {/* FIX: Added justifyContent="center" here */}
        <Grid container spacing={2} justifyContent="center">
          {[
            { label: 'Eco-Friendly Fleet', icon: <ElectricBike fontSize="large"/>, text: '100% Electric bikes for a greener future.' },
            { label: 'Local Partners', icon: <Storefront fontSize="large"/>, text: 'Supporting local businesses and vendors.' },
            { label: 'Happy Customers', icon: <EmojiEmotions fontSize="large"/>, text: 'Delivering smiles with every order.' },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  textAlign: 'center', 
                  py: 4, 
                  px: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'translateY(-8px)' }
                }}
              >
                <Box 
                  sx={{ 
                    color: 'primary.main', 
                    bgcolor: '#fdf1e3ff', 
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {item.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.text}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 3. STORY SECTION: RIDERS (Zig-Zag Layout) */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Grid container spacing={8} alignItems="center">
          {/* Image Side */}
          <Grid item xs={12} md={6}>
            <Box 
              component="img"
              src="https://iloilobikeshop.com/cdn/shop/files/1325363_12315475-f5f5-4338-85ad-4f43583be050.jpg?v=1730006938&width=1946"
              alt="Delivery Rider"
              sx={{ 
                width: '100%', 
                borderRadius: 6, 
                boxShadow: 4 
              }}
            />
          </Grid>
          {/* Text Side */}
          <Grid item xs={12} md={6}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 'bold', letterSpacing: 1.5, fontSize: '0.9rem' }}>
              OUR RIDERS
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, mt: 1 }}>
              Ride with pride.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 4, fontSize: '1.1rem' }}>
              Become a hero on wheels. Our riders enjoy flexible hours, competitive earnings, 
              and the joy of riding silent, efficient e-bikes. Join the green revolution today.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* 4. STORY SECTION: PARTNERS (Reversed Layout) */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Grid container spacing={8} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
          {/* Text Side */}
          <Grid item xs={12} md={6}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 'bold', letterSpacing: 1.5, fontSize: '0.9rem' }}>
              OUR PARTNERS
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, mt: 1 }}>
              Grow your business.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 4, fontSize: '1.1rem' }}>
              Whether you run a street stall or a 5-star restaurant, E-Bike Express helps you 
              reach more hungry customers. We handle the logistics; you focus on the cooking.
            </Typography>
          </Grid>
          {/* Image Side */}
          <Grid item xs={12} md={6}>
             
          </Grid>
        </Grid>
      </Container>

      {/* 5. JOIN US CARDS (Big CTA) */}
      <Box sx={{ bgcolor: 'white', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 800, mb: 6, color: 'text.primary' }}>
            Ready to get started?
          </Typography>
          
          {/* FIX: Added justifyContent="center" and increased spacing */}
          <Grid container spacing={4} justifyContent="center">
             
             {/* Card 1: Customer */}
             {/* FIX: Changed width from md={2} to md={4} */}
            <Grid item xs={12} md={4}>
              <CTA_Card 
                title="Order Food" 
                image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80"
                buttonText="Order Now"
                color="primary"
                link="/home"
              />
            </Grid>
            
            {/* Card 2: Explore */}
            {/* FIX: Changed width from md={2} to md={4} */}
            <Grid item xs={12} md={4}>
              <CTA_Card 
                title="Explore Different Foods" 
                image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80"
                buttonText="Explore Now"
                color="primary"
                link="/explore"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

    </Box>
  );
}

// Helper Component for the Bottom Cards
// Add 'link' to the props list here -----------------v
function CTA_Card({ title, image, buttonText, color, link }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Button 
          href={link} // <--- ADD THIS LINE to use the link
          variant="contained" 
          color={color} 
          fullWidth
          size="large"
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}