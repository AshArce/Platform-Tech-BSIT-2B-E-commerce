// src/app/layout.js
import { Box } from '@mui/material'; 
import { CartProvider } from './context/CartContext'; 
import { AuthProvider } from './context/AuthContext'; 
import { ProductProvider } from './context/ProductContext'; 
import MUIProvider from './components/MUIProvider'; 
import TopNav from './components/TopNav'; 
import MainNav from './components/MainNav';
import AuthGuard from './components/AuthGuard';
import AnimatePresenceRouter from './components/AnimatePresenceRouter'; 
import './globals.css';

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
            <ProductProvider>
              <CartProvider>
                <AuthGuard>
                  
                  {/* Wraps the entire page content to handle transitions */}
                  <AnimatePresenceRouter>
                    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                      <TopNav />
                      
                      <Box component="main" sx={{ flexGrow: 1, pb: { xs: 7, md: 0 } }}>
                        {children}
                      </Box>

                      <MainNav /> 
                    </Box>
                  </AnimatePresenceRouter>

                </AuthGuard>
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </MUIProvider>
      </body>
    </html>
  );
}