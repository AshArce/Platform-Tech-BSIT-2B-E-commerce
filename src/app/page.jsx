// src/app/page.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { 
  Box, Container, Typography, Button, TextField, InputAdornment, 
  Paper, Link as MuiLink, Divider, IconButton, Alert, Collapse 
} from '@mui/material';

// Icons
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email'; 
import LockIcon from '@mui/icons-material/Lock'; 
import PersonIcon from '@mui/icons-material/Person'; 
import PhoneIcon from '@mui/icons-material/Phone';   
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useAuth } from './context/AuthContext';

const LoginPage = () => {
  const router = useRouter(); 
  // 1. Extract auth functions
  const { login, register } = useAuth(); 

  const [view, setView] = useState('LANDING'); 
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '', // Acts as identifier (email/phone/username)
    phone: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (loginError) setLoginError('');
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (view === 'LOGIN') {
      // 2. Call Login - It returns { success, role }
      const result = login(formData.email, formData.password); 

      if (result.success) {
        console.log('Login Success! Role:', result.role);
        
        // 3. ROLE-BASED REDIRECT
        if (result.role === 'System Administrator') {
            router.push('/admin'); // Admin goes to Dashboard
        } else {
            router.push('/home'); // Customers go to Home
        }
      } else {
        setLoginError('Invalid email/username or password.');
      }
    } else {
      // Sign Up (New users are always Customers)
      if(!formData.fullName || !formData.email || !formData.password) {
        setLoginError('Please fill in all required fields.');
        return;
      }

      const result = register(formData);

      if (result.success) {
        console.log('Registration Success!');
        router.push('/home'); 
      } else {
        setLoginError(result.message); 
      }
    }
  };

  // --- RENDER HELPERS ---

  const renderLanding = () => (
    <Container maxWidth="xs">
      <Box sx={{ width: '100%' }}>
        <Button variant="contained" sx={{ width: '100%', py: 1.5, mb: 2, borderRadius: 2, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: 'grey.900' } }} startIcon={<GoogleIcon />}>
          Continue With Google
        </Button>
        <Button variant="contained" sx={{ width: '100%', py: 1.5, mb: 2, borderRadius: 2, bgcolor: '#1877F2', color: 'white', '&:hover': { bgcolor: '#165DD7' } }} startIcon={<FacebookIcon />}>
          Continue With Facebook
        </Button>
        <Divider sx={{ my: 3, color: 'rgba(0,0,0,0.5)' }}>OR</Divider>
        <Button variant="contained" sx={{ width: '100%', py: 1.5, mb: 2, borderRadius: 2, bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'grey.100' } }} startIcon={<EmailIcon />} onClick={() => { setView('SIGNUP'); setLoginError(''); }}>
          Create Account
        </Button>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Already have an account?</Typography>
          <Button variant="text" sx={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline' }} onClick={() => { setView('LOGIN'); setLoginError(''); }}>
            Sign In Here
          </Button>
        </Box>
      </Box>
    </Container>
  );

  const renderForm = (isSignUp) => (
    <Paper component="form" onSubmit={handleSubmit} elevation={4} sx={{ p: 4, borderRadius: 3, bgcolor: 'white', color: 'black', maxWidth: 400, mx: 'auto' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={() => setView('LANDING')} sx={{ mr: 1 }}><ArrowBackIcon /></IconButton>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Typography>
      </Box>

      <Collapse in={!!loginError}>
        <Alert severity="error" sx={{ mb: 2 }}>{loginError}</Alert>
      </Collapse>

      {isSignUp && (
        <TextField fullWidth name="fullName" label="Full Name" variant="outlined" margin="dense" value={formData.fullName} onChange={handleInputChange} InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon color="action" /></InputAdornment>) }} />
      )}

      <TextField fullWidth name="email" label={isSignUp ? "Email Address" : "Email/Phone/Username"} variant="outlined" margin="dense" value={formData.email} onChange={handleInputChange} InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon color="action" /></InputAdornment>) }} />

      {isSignUp && (
        <TextField fullWidth name="phone" label="Phone Number" variant="outlined" margin="dense" value={formData.phone} onChange={handleInputChange} InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneIcon color="action" /></InputAdornment>) }} />
      )}

      <TextField fullWidth name="password" label="Password" type={showPassword ? 'text' : 'password'} variant="outlined" margin="dense" value={formData.password} onChange={handleInputChange} InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon color="action" /></InputAdornment>), endAdornment: (<InputAdornment position="end"><IconButton onClick={handleClickShowPassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }} />

      <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 3, py: 1.5, borderRadius: 2, bgcolor: isSignUp ? '#FFC107' : 'black', color: isSignUp ? 'black' : 'white', '&:hover': { bgcolor: isSignUp ? '#FFB300' : 'grey.800' } }}>
        {isSignUp ? 'Sign Up' : 'Log In'}
      </Button>

      {!isSignUp && (
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ mb: 2, color: 'text.secondary', fontSize: '0.875rem' }}>OR LOGIN WITH</Divider>
          <Button variant="outlined" fullWidth startIcon={<GoogleIcon />} sx={{ mb: 1, color: 'text.primary', borderColor: '#ddd', textTransform: 'none' }}>Google</Button>
          <Button variant="contained" fullWidth startIcon={<FacebookIcon />} sx={{ bgcolor: '#1877F2', color: 'white', '&:hover': { bgcolor: '#165DD7' }, textTransform: 'none' }}>Facebook</Button>
        </Box>
      )}

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" component="span" color="text.secondary">{isSignUp ? 'Already have an account? ' : "Don't have an account? "}</Typography>
        <MuiLink component="button" type="button" underline="hover" sx={{ fontWeight: 'bold', color: 'primary.main', verticalAlign: 'baseline' }} onClick={() => { setView(isSignUp ? 'LOGIN' : 'SIGNUP'); setLoginError(''); }}>
          {isSignUp ? 'Log In' : 'Sign Up'}
        </MuiLink>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#FFC107', textAlign: 'center', py: 4, px: 2 }}>
      {view === 'LANDING' && (
        <Box sx={{ mb: 4, color: 'white' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
            <img src="image/icon.png" alt="Logo" style={{ maxWidth: '250px',}} />
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2, color: 'black' }}>E-BIKE EXPRESS</Typography>
          <Typography variant="h6" sx={{ mt: 1, color: 'black' }}>Find Your Flavor Faster</Typography>
        </Box>
      )}
      {view === 'LANDING' && renderLanding()}
      {view === 'SIGNUP' && renderForm(true)}
      {view === 'LOGIN' && renderForm(false)}
    </Box>
  );
};

export default LoginPage;