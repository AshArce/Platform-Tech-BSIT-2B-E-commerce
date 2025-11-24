// src/app/layout.js

import { Box } from '@mui/material'; 
import { CartProvider } from './context/CartContext'; 
import MUIProvider from './components/MUIProvider'; 
import TopNav from './components/TopNav'; 
import MainNav from './components/MainNav';

// 1. IMPORT THE AUTH PROVIDER
import { AuthProvider } from './context/AuthContext'; 

export const metadata = {
  title: 'E-Bike Express', 
  description: 'Food delivery at e-bike speed',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MUIProvider>
        
          <AuthProvider>
            <CartProvider>
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <TopNav />
                
                <Box component="main" sx={{ flexGrow: 1 }}>
                  {children}
                </Box>

                <MainNav /> 
              </Box>
            </CartProvider>
          </AuthProvider>
        </MUIProvider>
      </body>
    </html>
  );
}