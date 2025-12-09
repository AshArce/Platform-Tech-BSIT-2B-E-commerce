// src/app/page.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { 
  Box, Container, Typography, Button, TextField, InputAdornment, 
  Paper, Link as MuiLink, Divider, IconButton, Alert, Collapse 
} from '@mui/material';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email'; 
import LockIcon from '@mui/icons-material/Lock'; 
import PersonIcon from '@mui/icons-material/Person'; 
import PhoneIcon from '@mui/icons-material/Phone'; 
import BadgeIcon from '@mui/icons-material/Badge';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useAuth } from './context/AuthContext';

const LoginPage = () => {
  const router = useRouter(); 
  const { login, register } = useAuth(); 

  const [view, setView] = useState('LANDING'); 
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // 1. ADD USERNAME TO STATE
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '', 
    phone: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (loginError) setLoginError('');
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // --- 🔒 UPDATED VALIDATION LOGIC ---
  const validateRegisterForm = () => {
    const { fullName, username, email, phone, password } = formData;

    // 1. FULL NAME VALIDATION
    // Rule: More than 5 chars
    if (fullName.length <= 5) {
        return "Full Name must be more than 5 characters.";
    }
    // Rule: No special characters (Only Letters, Numbers, and Spaces allowed)
    // Regex: ^[a-zA-Z0-9 ]+$ means "Start to end, only allow letters, numbers, and space"
    if (!/^[a-zA-Z0-9 ]+$/.test(fullName)) {
        return "Full Name cannot contain special characters (@, #, $, etc).";
    }
    // Rule: No leading space
    if (fullName.startsWith(' ')) {
        return "Full Name cannot start with a space.";
    }
    // Rule: No double spaces / consecutive spaces
    if (fullName.includes('  ')) {
        return "Full Name cannot contain double spaces.";
    }

    // 2. USERNAME VALIDATION (New)
    if (!username || username.length < 3) {
        return "Username must be at least 3 characters.";
    }
    // Username shouldn't have spaces
    if (/\s/.test(username)) {
        return "Username cannot contain spaces.";
    }

    // 3. Email Validation (@ and .com)
    if (!email.includes('@') || !email.endsWith('.com')) {
        return "Email must contain '@' and end with '.com'.";
    }

    // 4. Phone Number (Numbers only, 9-11 digits)
    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(phone)) {
        return "Phone number must be digits only and between 9-11 numbers.";
    }

    // 5. Password Validation
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
        return "Password must be at least 8 chars (1 Upper, 1 Lower, 1 Number, 1 Special Char).";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (view === 'LOGIN') {
      const result = await login(formData.email, formData.password); 

      if (result.success) {
        if (result.role === 'System Administrator') {
            router.push('/admin'); 
        } else {
            router.push('/home'); 
        }
      } else {
        setLoginError('Invalid email/username or password.');
      }
    } else {
      // --- SIGN UP ---
      const validationError = validateRegisterForm();
      if (validationError) {
        setLoginError(validationError);
        return; 
      }

      const result = await register(formData);

      if (result.success) {
        router.push('/home'); 
      } else {
        setLoginError(result.message); 
      }
    }
  };

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
        <Alert severity="error" sx={{ mb: 2, fontSize: '0.85rem' }}>{loginError}</Alert>
      </Collapse>

      {isSignUp && (
        <>
            <TextField fullWidth name="fullName" label="Full Name" variant="outlined" margin="dense" value={formData.fullName} onChange={handleInputChange} InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon color="action" /></InputAdornment>) }} />
            
            {/* NEW USERNAME FIELD */}
            <TextField fullWidth name="username" label="Username" variant="outlined" margin="dense" value={formData.username} onChange={handleInputChange} InputProps={{ startAdornment: (<InputAdornment position="start"><BadgeIcon color="action" /></InputAdornment>) }} />
        </>
      )}

      <TextField fullWidth name="email" label={isSignUp ? "Email Address" : "Email/Phone/Username"} variant="outlined" margin="dense" value={formData.email} onChange={handleInputChange} InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon color="action" /></InputAdornment>) }} />

      {isSignUp && (
        <TextField fullWidth name="phone" label="Phone Number" variant="outlined" margin="dense" value={formData.phone} onChange={handleInputChange} InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneIcon color="action" /></InputAdornment>) }} />
      )}

      <TextField fullWidth name="password" label="Password" type={showPassword ? 'text' : 'password'} variant="outlined" margin="dense" value={formData.password} onChange={handleInputChange} InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon color="action" /></InputAdornment>), endAdornment: (<InputAdornment position="end"><IconButton onClick={handleClickShowPassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }} />
      
      {isSignUp && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, lineHeight: 1.2 }}>
          * Passwords must be at least 8 characters with 1 Upper, 1 Lower, 1 Number, and 1 Special char.
        </Typography>
      )}

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
            <img src="/vercel.svg" alt="Logo" style={{ maxWidth: '150px', filter: 'invert(100%) brightness(200%)' }} />
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