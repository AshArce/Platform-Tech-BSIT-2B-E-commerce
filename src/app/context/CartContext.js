// src/app/context/CartContext.js
'use client'; 

import React, { createContext, useState, useContext, useEffect } from 'react';
import { orders as initialOrders } from '../../data/orders'; 

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState(initialOrders);
  const [checkoutItems, setCheckoutItems] = useState([]); 

  // Load Data
  useEffect(() => {
    const storedCart = localStorage.getItem('FOODIE_CART');
    if (storedCart) setCartItems(JSON.parse(storedCart));
    const storedOrders = localStorage.getItem('FOODIE_ORDERS');
    if (storedOrders) setOrderHistory(JSON.parse(storedOrders));
  }, []);

  useEffect(() => { localStorage.setItem('FOODIE_CART', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem('FOODIE_ORDERS', JSON.stringify(orderHistory)); }, [orderHistory]);

  // 1. UPDATED ADD TO CART LOGIC
  const addToCart = (productToAdd) => {
    setCartItems(prevItems => {
      // We look for an item with the same ID AND same Options (Size, etc)
      // We assume productToAdd comes with a unique 'cartId' generated in the modal
      const existingItem = prevItems.find(item => item.cartId === productToAdd.cartId);

      if (existingItem) {
        return prevItems.map(item => 
          item.cartId === productToAdd.cartId 
            ? { ...item, quantity: item.quantity + productToAdd.quantity } 
            : item
        );
      } else {
        return [...prevItems, productToAdd];
      }
    });
  };

  // 2. UPDATED REMOVE LOGIC (By cartId)
  const removeFromCart = (cartId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.cartId === cartId);
      if (!existingItem) return prevItems; // Safety check

      if (existingItem.quantity === 1) return prevItems.filter(item => item.cartId !== cartId);
      return prevItems.map(item => item.cartId === cartId ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  // 3. UPDATED DELETE LOGIC (By cartId)
  const deleteItemFromCart = (cartId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
  };

  // ... (Keep updateOrderStatus and processOrder logic same as before) ...
  const updateOrderStatus = (orderId, newStatus) => {
    setOrderHistory(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const processOrder = (paidItemIds, totalAmount, userId) => {
    // Filter by cartId
    setCartItems(prevItems => prevItems.filter(item => !paidItemIds.includes(item.cartId)));
    setCheckoutItems([]); 

    const newOrderId = `ORD-${Math.floor(Math.random() * 10000)}`;
    const newOrder = {
      id: newOrderId,
      userId: userId, 
      date: new Date().toLocaleDateString(),
      total: parseFloat(totalAmount),
      status: 'Cooking',
      items: checkoutItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        // Optional: Save size/options to history if you want
        size: item.selectedSize,
        options: item.selectedOptions
      }))
    };

    setOrderHistory(prev => [newOrder, ...prev]);
    setTimeout(() => { updateOrderStatus(newOrderId, 'On the Way'); }, 5000);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

  return (
    <CartContext.Provider value={{ 
        cartItems, cartCount, cartTotal, 
        addToCart, removeFromCart, deleteItemFromCart,
        checkoutItems, setCheckoutItems, 
        processOrder, orderHistory, updateOrderStatus 
      }}>
      {children}
    </CartContext.Provider>
  );
};