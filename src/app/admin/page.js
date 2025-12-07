// src/app/admin/page.js
'use client';

import React, { useState } from 'react';
import { 
  Container, Typography, Box, Tabs, Tab, Button, Paper, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Chip, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, InputAdornment
} from '@mui/material';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TimerIcon from '@mui/icons-material/Timer';
import LogoutIcon from '@mui/icons-material/Logout'; // New Icon

import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { currentUser, logout } = useAuth(); // Get logout function
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  // Protect Route (Admin Only)
  if (!currentUser || currentUser.role !== 'System Administrator') {
    if (typeof window !== 'undefined') router.push('/');
    return null; 
  }

  const handleLogout = () => {
    logout();
    router.push('/'); // Redirect to login page
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      
      {/* HEADER WITH LOGOUT */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h3" fontWeight="bold">Admin Dashboard</Typography>
        <Button 
            variant="outlined" 
            color="error" 
            startIcon={<LogoutIcon />} 
            onClick={handleLogout}
        >
            Log Out
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="Product Management" />
          <Tab label="Refund Requests" />
        </Tabs>
      </Box>

      {tabValue === 0 && <ProductManagement />}
      {tabValue === 1 && <RefundManagement />}

    </Container>
  );
}

// --- SUB-COMPONENT: PRODUCT MANAGEMENT ---
function ProductManagement() {
  const { allProducts, deleteProduct, addProduct, updateProduct } = useProducts();
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  // State for form fields (Default cookingTime: 5s)
  const [currentProduct, setCurrentProduct] = useState({
    name: '', price: '', category: 'Pizza', description: '', imageUrl: '', cookingTime: 5
  });

  const handleOpenAdd = () => {
    setEditMode(false);
    setCurrentProduct({ name: '', price: '', category: 'Pizza', description: '', imageUrl: '', cookingTime: 5 });
    setOpenModal(true);
  };

  const handleOpenEdit = (product) => {
    setEditMode(true);
    // Use existing cookingTime or default to 5
    setCurrentProduct({ ...product, cookingTime: product.cookingTime || 5 });
    setOpenModal(true);
  };

  const handleSubmit = () => {
    const productData = {
      ...currentProduct,
      price: parseFloat(currentProduct.price),
      cookingTime: parseInt(currentProduct.cookingTime) || 5, // Save as Number
      imageUrl: currentProduct.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image',
      inStock: true,
      size: ['Small', 'Medium', 'Large']
    };

    if (editMode) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setOpenModal(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">All Products ({allProducts.length})</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>
          Add New Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Time</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell fontWeight="bold">{product.name}</TableCell>
                <TableCell><Chip label={product.category} size="small" /></TableCell>
                <TableCell>₱{product.price.toFixed(2)}</TableCell>
                <TableCell>
                    <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
                        <TimerIcon fontSize="small" />
                        {product.cookingTime || 5}s
                    </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenEdit(product)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => deleteProduct(product.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField 
                label="Product Name" 
                fullWidth 
                value={currentProduct.name} 
                onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})} 
            />
            
            <Box display="flex" gap={2}>
                <TextField 
                    label="Price" 
                    type="number" 
                    fullWidth 
                    value={currentProduct.price} 
                    onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})} 
                />
                <TextField 
                    label="Cooking Time (Secs)" 
                    type="number" 
                    fullWidth 
                    value={currentProduct.cookingTime} 
                    onChange={(e) => setCurrentProduct({...currentProduct, cookingTime: e.target.value})} 
                    InputProps={{
                        endAdornment: <InputAdornment position="end">sec</InputAdornment>,
                    }}
                />
            </Box>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={currentProduct.category} label="Category" onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}>
                {['Pizza', 'Burger', 'Drinks', 'Noodles', 'Rice', 'Dessert'].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField label="Description" multiline rows={3} fullWidth value={currentProduct.description} onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})} />
            <TextField label="Image URL" fullWidth value={currentProduct.imageUrl} onChange={(e) => setCurrentProduct({...currentProduct, imageUrl: e.target.value})} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>{editMode ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// --- SUB-COMPONENT: REFUND MANAGEMENT ---
function RefundManagement() {
  const { orderHistory, updateOrderStatus } = useCart();

  // Filter for orders needing review
  const refundRequests = orderHistory.filter(o => o.status === 'Refund Requested');

  return (
    <Box>
      <Typography variant="h5" mb={3}>Refund Requests ({refundRequests.length})</Typography>

      {refundRequests.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">No pending refund requests.</Typography>
        </Paper>
      ) : (
        refundRequests.map(order => (
          <Paper key={order.id} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography fontWeight="bold">{order.id} - ₱{order.total}</Typography>
              <Typography variant="caption" color="text.secondary">Date: {order.date}</Typography>
              <Box mt={1}>
                {order.items.map((i, idx) => (
                  <Chip key={idx} label={`${i.quantity}x ${i.name}`} size="small" sx={{ mr: 0.5 }} />
                ))}
              </Box>
            </Box>
            <Box>
              <Button 
                variant="outlined" 
                color="error" 
                size="small" 
                startIcon={<CancelIcon />} 
                sx={{ mr: 1 }}
                onClick={() => updateOrderStatus(order.id, 'Delivered')} // Reject logic
              >
                Reject
              </Button>
              <Button 
                variant="contained" 
                color="success" 
                size="small" 
                startIcon={<CheckCircleIcon />}
                onClick={() => updateOrderStatus(order.id, 'Refunded')} // Approve logic
              >
                Approve
              </Button>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
}