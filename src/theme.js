// src/theme.js
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// We export a FUNCTION now, not a static object
export const getTheme = (mode) => createTheme({
  palette: {
    mode, // 'light' or 'dark'
    ...(mode === 'light'
      ? {
          // LIGHT MODE COLORS
          primary: { main: '#2196f3' },
          secondary: { main: '#ff9800' },
          background: { default: '#f5f5f5', paper: '#ffffff' },
          text: { primary: '#171717', secondary: '#666666' },
        }
      : {
          // DARK MODE COLORS
          primary: { main: '#90caf9' }, // Lighter blue for dark backgrounds
          secondary: { main: '#ffb74d' },
          background: { default: '#121212', paper: '#1e1e1e' }, // Standard Dark Mode Greys
          text: { primary: '#ffffff', secondary: '#aaaaaa' },
        }),
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h3: { fontWeight: 600, marginBottom: '1rem' },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 8 } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          // Remove heavy shadows in dark mode for a cleaner flat look
          boxShadow: mode === 'dark' ? 'none' : '0 4px 12px rgba(0,0,0,0.05)',
          border: mode === 'dark' ? '1px solid #333' : 'none',
        },
      },
    },
    // Fix for the Bottom Navigation in Dark Mode
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#1e1e1e' : '#FFC107', // Keep Yellow in Light, Dark in Dark
        },
      },
    },
    MuiBottomNavigationAction: {
        styleOverrides: {
            root: {
                '&.Mui-selected': {
                    color: mode === 'dark' ? '#90caf9' : 'black', // Blue in Dark, Black in Light
                },
                color: mode === 'dark' ? '#888' : 'rgba(0,0,0,0.6)'
            }
        }
    }
  },
});