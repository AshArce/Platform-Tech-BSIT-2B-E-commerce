// src/app/admin/page.js
'use client';

import React, { useState } from 'react';
import { 
  Container, Typography, Box, Tabs, Tab, Button, Paper, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Chip, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, InputAdornment, Stack, Alert
} from '@mui/material';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TimerIcon from '@mui/icons-material/Timer';
import LogoutIcon from '@mui/icons-material/Logout'; 
import InventoryIcon from '@mui/icons-material/Inventory'; 

import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { currentUser, logout } = useAuth(); 
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  // Protect Route (Admin Only)
  if (!currentUser || currentUser.role !== 'System Administrator') {
    if (typeof window !== 'undefined') router.push('/');
    return null; 
  }

  const handleLogout = () => {
    logout();
    router.push('/'); 
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      
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
  
  // --- STATE FOR MAIN EDIT/ADD MODAL ---
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: '', price: '', category: 'Pizza', description: '', imageUrl: '', cookingTime: 5
  });

  // --- STATE FOR STOCK MODAL ---
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [stockTarget, setStockTarget] = useState(null); 
  const [stockAction, setStockAction] = useState('add'); 
  const [stockAmount, setStockAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // --- HANDLERS FOR MAIN PRODUCT (ADD/EDIT) ---
  const handleOpenAdd = () => {
    setEditMode(false);
    setCurrentProduct({ name: '', price: '', category: 'Pizza', description: '', imageUrl: '', cookingTime: 5 });
    setOpenModal(true);
  };

  const handleOpenEdit = (product) => {
    setEditMode(true);
    setCurrentProduct({ ...product, cookingTime: product.cookingTime || 5 });
    setOpenModal(true);
  };

  const handleSubmit = () => {
    const productData = {
      ...currentProduct,
      price: parseFloat(currentProduct.price),
      cookingTime: parseInt(currentProduct.cookingTime) || 5, 
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

  // --- HANDLERS FOR STOCK MODIFICATION ---
  const handleOpenStock = (product) => {
    setStockTarget(product);
    setStockAction('add');
    setStockAmount('');
    setIsSubmitting(false);
    setStockModalOpen(true);
  };

  const handleApplyStock = async () => {
    if (!stockTarget) return;
    setIsSubmitting(true); 

    let newStockCount = stockTarget.stockCount || 0;
    const amount = parseInt(stockAmount) || 0;

    if (stockAction === 'add') {
        newStockCount += amount;
    } else if (stockAction === 'reduce') {
        newStockCount = Math.max(0, newStockCount - amount); 
    } else if (stockAction === 'clear') {
        newStockCount = 0;
    }

    const updatedProduct = {
        ...stockTarget,
        stockCount: newStockCount,
        inStock: newStockCount > 0 
    };

    await updateProduct(updatedProduct);

    setTimeout(() => {
        setIsSubmitting(false);
        setStockModalOpen(false);
    }, 300); 
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
              <TableCell>Stock</TableCell> 
              <TableCell>Price</TableCell>
              <TableCell>Time</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell fontWeight="bold">
                    {product.name}
                    <Typography variant="caption" display="block" color="text.secondary">
                        {product.category}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Chip 
                        label={product.stockCount || 0} 
                        color={product.stockCount > 0 ? "success" : "error"} 
                        size="small" 
                        variant="outlined"
                    />
                </TableCell>
                <TableCell>₱{product.price.toFixed(2)}</TableCell>
                <TableCell>
                    <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
                        <TimerIcon fontSize="small" />
                        {product.cookingTime || 5}s
                    </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="info" onClick={() => handleOpenStock(product)} title="Manage Stock">
                    <InventoryIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleOpenEdit(product)} title="Edit Details">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteProduct(product.id)} title="Delete Product">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- MODAL 1: ADD/EDIT PRODUCT --- */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Product Details' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField label="Product Name" fullWidth value={currentProduct.name} onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})} />
            
            <Box display="flex" gap={2}>
                <TextField label="Price" type="number" fullWidth value={currentProduct.price} onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})} />
                <TextField label="Cooking Time (Secs)" type="number" fullWidth value={currentProduct.cookingTime} onChange={(e) => setCurrentProduct({...currentProduct, cookingTime: e.target.value})} InputProps={{ endAdornment: <InputAdornment position="end">sec</InputAdornment> }} />
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

      {/* --- MODAL 2: STOCK MANAGEMENT --- */}
      <Dialog open={stockModalOpen} onClose={() => !isSubmitting && setStockModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Modify Stock</DialogTitle>
        <DialogContent>
            {stockTarget && (
                <Box mt={1}>
                    <Alert severity="info" sx={{ mb: 3 }}>
                        Current Stock for <strong>{stockTarget.name}</strong>: {stockTarget.stockCount || 0}
                    </Alert>

                    <Stack spacing={3}>
                        <FormControl fullWidth>
                            <InputLabel>Action</InputLabel>
                            <Select 
                                value={stockAction} 
                                label="Action" 
                                onChange={(e) => setStockAction(e.target.value)}
                            >
                                <MenuItem value="add">Add Stock (+)</MenuItem>
                                <MenuItem value="reduce">Reduce Stock (-)</MenuItem>
                                <MenuItem value="clear">Clear Stock (Set to 0)</MenuItem>
                            </Select>
                        </FormControl>

                        {stockAction !== 'clear' && (
                             <TextField 
                                label="Quantity" 
                                type="number" 
                                fullWidth 
                                value={stockAmount}
                                onChange={(e) => setStockAmount(e.target.value)}
                                InputProps={{ inputProps: { min: 1 } }}
                                autoFocus
                             />
                        )}

                        {stockAction === 'clear' && (
                            <Typography color="error.main" variant="body2">
                                Warning: This will set the available stock to 0 immediately.
                            </Typography>
                        )}
                    </Stack>
                </Box>
            )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setStockModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button 
                variant="contained" 
                onClick={handleApplyStock} 
                disabled={isSubmitting || (stockAction !== 'clear' && !stockAmount)}
                color={stockAction === 'clear' ? "error" : "primary"}
            >
                {isSubmitting ? 'Applying...' : 'Apply Change'}
            </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

// --- SUB-COMPONENT: REFUND MANAGEMENT ---
function RefundManagement() {
  const { orderHistory, updateOrderStatus } = useCart();
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
                variant="outlined" color="error" size="small" startIcon={<CancelIcon />} sx={{ mr: 1 }}
                onClick={() => updateOrderStatus(order.id, 'Delivered')}
              >
                Reject
              </Button>
              <Button 
                variant="contained" color="success" size="small" startIcon={<CheckCircleIcon />}
                onClick={() => updateOrderStatus(order.id, 'Refunded')}
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