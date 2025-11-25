// src/app/context/CartContext.js
'use client'; 

import React, { createContext, useState, useContext, useEffect } from 'react';
import { orders as initialOrders } from '../../data/orders'; 

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize with defaults, we will overwrite them in useEffect if storage exists
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState(initialOrders);
  
  const [checkoutItems, setCheckoutItems] = useState([]); 

  // 1. LOAD DATA ON STARTUP
  useEffect(() => {
    // Load Cart
    const storedCart = localStorage.getItem('FOODIE_CART');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    // Load Orders
    const storedOrders = localStorage.getItem('FOODIE_ORDERS');
    if (storedOrders) {
      setOrderHistory(JSON.parse(storedOrders));
    } else {
      // If no history exists in storage (first run), save the mock data
      localStorage.setItem('FOODIE_ORDERS', JSON.stringify(initialOrders));
    }
  }, []);

  // 2. SAVE CART AUTOMATICALLY
  // Whenever cartItems changes, save it to storage
  useEffect(() => {
    localStorage.setItem('FOODIE_CART', JSON.stringify(cartItems));
  }, [cartItems]);

  // 3. SAVE ORDERS AUTOMATICALLY
  // Whenever orderHistory changes, save it to storage
  useEffect(() => {
    localStorage.setItem('FOODIE_ORDERS', JSON.stringify(orderHistory));
  }, [orderHistory]);


  // --- EXISTING LOGIC BELOW (Unchanged) ---

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem.quantity === 1) return prevItems.filter(item => item.id !== productId);
      return prevItems.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  const deleteItemFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrderHistory(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const processOrder = (paidItemIds, totalAmount, userId) => {
    setCartItems(prevItems => prevItems.filter(item => !paidItemIds.includes(item.id)));
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
        price: item.price
      }))
    };

    setOrderHistory(prev => [newOrder, ...prev]);

    setTimeout(() => {
      updateOrderStatus(newOrderId, 'On the Way');
    }, 5000);
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