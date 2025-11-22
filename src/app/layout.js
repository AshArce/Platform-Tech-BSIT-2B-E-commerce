// src/app/layout.js

import { Box } from '@mui/material'; 
import { CartProvider } from './context/CartContext'; 
import MUIProvider from './components/MUIProvider'; 
import TopNav from './components/TopNav'; 
import MainNav from './components/MainNav';
export const metadata = {
  title: 'E-Bike Express', // Updated Title
  description: 'Food delivery at e-bike speed',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MUIProvider>
          <CartProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <TopNav />
              
              {/* Main Content Area */}
              {/* Added pb: 7 (padding-bottom) so content isn't hidden behind the fixed BottomNav on mobile */}
              <Box component="main" sx={{ flexGrow: 1, pb: { xs: 7, md: 0 } }}>
                {children}
              </Box>

              <MainNav />
            </Box>
          </CartProvider>
        </MUIProvider>
      </body>
    </html>
  );
}