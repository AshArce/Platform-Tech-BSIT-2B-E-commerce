// about/page.js
'use client';
import React, { useState } from 'react';
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
  Paper,
  Avatar,
  Dialog,            
  DialogTitle,       
  DialogContent,     
  DialogContentText, 
  DialogActions,     
  TextField,         
  IconButton,
  MenuItem,
  Snackbar, 
  Alert     
} from '@mui/material';
import { 
  ElectricBike, 
  Storefront, 
  EmojiEmotions,
  ArrowForward, 
  CheckCircleOutline,
  Close as CloseIcon 
} from '@mui/icons-material';

export default function AboutPage() {
  const theme = useTheme();
  // Check if we are in dark mode to apply special effects
  const isDark = theme.palette.mode === 'dark';

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  
  const [openRiderForm, setOpenRiderForm] = useState(false);
  const handleOpenRider = () => setOpenRiderForm(true);
  const handleCloseRider = () => setOpenRiderForm(false);

  const [openPartnerForm, setOpenPartnerForm] = useState(false);
  const handleOpenPartner = () => setOpenPartnerForm(true);
  const handleClosePartner = () => setOpenPartnerForm(false);

  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSubmit = (type) => {
    if (type === 'rider') setOpenRiderForm(false);
    if (type === 'partner') setOpenPartnerForm(false);
    setOpenSuccess(true);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSuccess(false);
  };

  const teamMembers = [
    { name: 'John Ashley Arcebuche', role: 'Founder / Developer', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80' },
    { name: 'Riddik De Leon', role: 'Member / Fishball Vendor', img: '../image/Teams/riddik.jpg' },
    { name: 'Marco Jay V Reyes', role: 'Member / Designer', img: '../image/Teams/marco.jpg' },
    { name: 'Casely Aguilar', role: 'Member / Designer', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  ];

  return (
    // CHANGED: Removed hardcoded bg, used background.default
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10, transition: 'background-color 0.3s' }}>
      
      {/* 1. HERO SECTION */}
      <Box 
        sx={{ 
          // FIXED: Changed 'white' to background.paper
          bgcolor: 'background.paper', 
          pt: { xs: 8, md: 12 }, 
          pb: { xs: 12, md: 14 },
          textAlign: 'center',
          overflow: 'hidden',
          transition: 'background-color 0.3s'
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
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              // COOL FEATURE: Gradient Text in Dark Mode
              ...(isDark && {
                background: 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              })
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
              mb: 4,
              fontSize: { xs: '1rem', md: '1.25rem' }
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
      <Container maxWidth="lg" sx={{ mt: { xs: -8, md: -10 }, mb: 12, position: 'relative', zIndex: 2 }}>
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
                  // FIXED: Card inherits theme style, but added explicit background for safety
                  bgcolor: 'background.paper',
                  '&:hover': { transform: 'translateY(-8px)' }
                }}
              >
                <Box 
                  sx={{ 
                    color: 'primary.main', 
                    // FIXED: Dynamic color for icon background
                    bgcolor: isDark ? 'rgba(144, 202, 249, 0.1)' : '#fdf1e3ff', 
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
                <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">
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

      {/* ========================================================= */}
      {/* 3 & 4. JOIN THE MOVEMENT SECTION                          */}
      {/* ========================================================= */}
      <Box sx={{ 
          // FIXED: Changed grey.50 to background.default to match dark mode
          bgcolor: 'background.default', 
          py: { xs: 6, md: 10 }, 
          mb: 12 
      }}>
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 1.5 }}>
                    BE PART OF THE CHANGE
                </Typography>
                <Typography 
                    variant="h3" 
                    fontWeight={800} 
                    sx={{ 
                        mt: 1, 
                        fontSize: { xs: '2rem', md: '3rem'},
                        color: 'text.primary' // Ensure text is mapped to theme
                    }}
                >
                    Join the Movement
                </Typography>
            </Box>

            <Grid container spacing={4} justifyContent="center" alignItems="stretch">
                
                {/* RIDER CARD */}
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: { xs: 3, md: 5 }, 
                            borderRadius: 6, 
                            height: '100%', 
                            border: '1px solid',
                            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'grey.200',
                            bgcolor: 'background.paper', // Ensure paper color matches theme
                            display: 'flex', 
                            flexDirection: 'column',
                            transition: 'all 0.3s',
                            '&:hover': { borderColor: 'primary.main', boxShadow: 4 }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ p: 1.5, bgcolor: isDark ? 'grey.800' : 'grey.900', color: 'white', borderRadius: 3, mr: 2 }}>
                                <ElectricBike />
                            </Box>
                            <Typography variant="h5" fontWeight={800} color="text.primary">For Riders</Typography>
                        </Box>
                        
                        <Typography variant="h4" fontWeight={900} gutterBottom color="text.primary">
                            Ride with pride.
                        </Typography>
                        
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7, flexGrow: 1 }}>
                            Join a community of riders who are making the city greener, one delivery at a time.
                            Enjoy flexible hours and competitive earnings.
                        </Typography>

                        <Box sx={{ mb: 4 }}>
                            {['Flexible Schedule', 'Weekly Earnings', 'Eco-friendly Bike Provided'].map((feat) => (
                                <Box key={feat} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <CheckCircleOutline sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                                    <Typography variant="body2" fontWeight={500} color="text.primary">{feat}</Typography>
                                </Box>
                            ))}
                        </Box>

                        <Button 
                            onClick={handleOpenRider} 
                            variant="contained" 
                            size="large" 
                            endIcon={<ArrowForward />}
                            sx={{ 
                                bgcolor: isDark ? 'grey.700' : 'grey.900', 
                                color: 'white', 
                                py: 1.5,
                                borderRadius: 3,
                                '&:hover': { bgcolor: isDark ? 'grey.600' : 'grey.800' },
                                mt: 'auto'
                            }}
                        >
                            Apply to Ride
                        </Button>
                    </Paper>
                </Grid>

                {/* PARTNER CARD */}
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: { xs: 3, md: 5 }, 
                            borderRadius: 6, 
                            height: '100%', 
                            border: '1px solid',
                            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'grey.200',
                            bgcolor: 'background.paper',
                            display: 'flex', 
                            flexDirection: 'column',
                            transition: 'all 0.3s',
                            '&:hover': { borderColor: 'primary.main', boxShadow: 4 }
                        }}
                    >
                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ p: 1.5, bgcolor: 'primary.main', color: 'white', borderRadius: 3, mr: 2 }}>
                                <Storefront />
                            </Box>
                            <Typography variant="h5" fontWeight={800} color="text.primary">For Businesses</Typography>
                        </Box>

                        <Typography variant="h4" fontWeight={900} gutterBottom color="text.primary">
                            Partner with us.
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7, flexGrow: 1 }}>
                            Whether you run a street stall or a restaurant, we help you reach more customers
                            without increasing your carbon footprint.
                        </Typography>

                        <Box sx={{ mb: 4 }}>
                            {['Reach New Customers', 'Zero Commission for 1st Month', 'Real-time Tracking'].map((feat) => (
                                <Box key={feat} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <CheckCircleOutline sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                                    <Typography variant="body2" fontWeight={500} color="text.primary">{feat}</Typography>
                                </Box>
                            ))}
                        </Box>

                        <Button 
                            onClick={handleOpenPartner}
                            variant="contained" 
                            color="primary"
                            size="large" 
                            endIcon={<ArrowForward />}
                            sx={{ py: 1.5, borderRadius: 3, mt: 'auto' }}
                        >
                            Become a Partner
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
      </Box>

      {/* ============================================== */}
      {/* 4.5 TEAM SECTION                               */}
      {/* ============================================== */}
      <Container maxWidth="lg" sx={{ mb: { xs: 8, md: 12 } }}>
        <Typography 
            variant="h3" 
            sx={{ 
                textAlign: 'center', 
                fontWeight: 800, 
                mb: { xs: 4, md: 6 }, 
                color: 'text.primary',
                fontSize: { xs: '2rem', md: '3rem' }
            }}
        >
          Meet Our Team
        </Typography>
        
        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  component="img"
                  src={member.img} 
                  alt={member.name}
                  sx={{ 
                    width: { xs: 120, sm: 160, md: 200 }, 
                    height: { xs: 120, sm: 160, md: 200 }, 
                    borderRadius: '50%', 
                    objectFit: 'cover', 
                    mb: 2, 
                    boxShadow: 3,
                    border: '4px solid',
                    borderColor: 'background.paper' // Border matches background
                  }}
                />
                <Typography 
                    variant="h6" 
                    fontWeight="bold"
                    color="text.primary"
                    sx={{ 
                        fontSize: { xs: '1rem', md: '1.25rem' }, 
                        lineHeight: 1.2,
                        mb: 0.5
                    }}
                >
                  {member.name}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="primary.main" 
                    fontWeight="medium"
                    sx={{ fontSize: { xs: '0.75rem', md: '1rem' } }}
                >
                  {member.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 5. JOIN US CARDS (Big CTA) */}
      <Box sx={{ 
          // FIXED: Changed 'white' to background.paper
          bgcolor: 'background.paper', 
          py: 10 
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 800, mb: 6, color: 'text.primary' }}>
            Ready to get started?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <CTA_Card 
                title="Order Food" 
                image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80"
                buttonText="Order Now"
                color="primary"
                link="/home"
              />
            </Grid>
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

      {/* =========================================== */}
      {/* 6. POP-UP FORMS (DIALOGS)                   */}
      {/* =========================================== */}

      {/* --- A. RIDER APPLICATION FORM --- */}
      <Dialog 
        open={openRiderForm} 
        onClose={handleCloseRider}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h5" component="span" fontWeight={800}>
            Join as a Rider
          </Typography>
          <IconButton onClick={handleCloseRider}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Fill out the details below and our team will get back to you within 24 hours.
          </DialogContentText>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Full Name" fullWidth variant="outlined" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Phone Number" fullWidth variant="outlined" required type="tel" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email Address" fullWidth variant="outlined" required type="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField label="City / Area" fullWidth variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Do you own an electric bike?" 
                  fullWidth 
                  variant="outlined" 
                  select 
                  defaultValue=""
                >
                  <MenuItem value="yes">Yes, I have my own e-bike</MenuItem>
                  <MenuItem value="no">No, I need to rent one</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCloseRider} color="inherit" size="large" sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit('rider')} variant="contained" color="primary" size="large" sx={{ borderRadius: 2, px: 4 }}>
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- B. PARTNER APPLICATION FORM --- */}
      <Dialog 
        open={openPartnerForm} 
        onClose={handleClosePartner}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h5" component="span" fontWeight={800}>
            Become a Business Partner
          </Typography>
          <IconButton onClick={handleClosePartner}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Ready to grow your business? Tell us about your store and we'll help you get set up.
          </DialogContentText>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Business Name" fullWidth variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Owner / Contact Person" fullWidth variant="outlined" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Phone Number" fullWidth variant="outlined" required type="tel" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email Address" fullWidth variant="outlined" required type="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Business Address" fullWidth variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Business Type" 
                  fullWidth 
                  variant="outlined" 
                  select 
                  defaultValue=""
                >
                  <MenuItem value="restaurant">Restaurant / Cafe</MenuItem>
                  <MenuItem value="street_food">Street Food Stall</MenuItem>
                  <MenuItem value="grocery">Grocery / Market</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClosePartner} color="inherit" size="large" sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit('partner')} variant="contained" color="primary" size="large" sx={{ borderRadius: 2, px: 4 }}>
            Submit Partner Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* =========================================== */}
      {/* 7. SUCCESS MESSAGE SNACKBAR (TOAST)         */}
      {/* =========================================== */}
      <Snackbar 
        open={openSuccess} 
        autoHideDuration={6000} 
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
          Application Submitted Successfully! Our team will contact you soon.
        </Alert>
      </Snackbar>

    </Box>
  );
}

// Helper Component for the Bottom Cards
function CTA_Card({ title, image, buttonText, color, link }) {
  return (
    // FIXED: Card color inheritance
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" component="div" fontWeight="bold" gutterBottom color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Button 
          href={link}
          variant="contained" 
          color={color} 
          fullWidth
          size="large"
          sx={{ borderRadius: 2, py: 1.5 }}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}