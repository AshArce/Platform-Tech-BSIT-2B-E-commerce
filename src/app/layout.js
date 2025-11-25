// src/app/layout.js

import { Box } from '@mui/material'; 
import { CartProvider } from './context/CartContext'; 
import { AuthProvider } from './context/AuthContext'; 
import MUIProvider from './components/MUIProvider'; 
import TopNav from './components/TopNav'; 
import MainNav from './components/MainNav';
import AuthGuard from './components/AuthGuard'; // 1. Import the Guard

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
              {/* 2. Apply the AuthGuard inside the Providers */}
              <AuthGuard>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <TopNav />
                  
                  <Box component="main" sx={{ flexGrow: 1, pb: { xs: 7, md: 0 } }}>
                    {children}
                  </Box>

                  <MainNav /> 
                </Box>
              </AuthGuard>
            </CartProvider>
          </AuthProvider>
        </MUIProvider>
      </body>
    </html>
  );
}