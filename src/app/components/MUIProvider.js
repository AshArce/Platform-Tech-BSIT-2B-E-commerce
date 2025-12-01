// src/app/components/MUIProvider.js
'use client';

import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getTheme } from '../../theme'; // Import the function, not the object
import { ColorModeProvider, useColorMode } from '../context/ThemeContext';

// We need a sub-component to access the useColorMode hook
const ThemeWrapper = ({ children }) => {
  const { mode } = useColorMode();
  
  // Generate the theme based on the current mode
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default function MUIProvider({ children }) {
  return (
    <AppRouterCacheProvider>
      <ColorModeProvider>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </ColorModeProvider>
    </AppRouterCacheProvider>
  );
}