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

  // Load/Save Logic (Keep existing localStorage useEffects here...)
  // ... (I will omit the useEffects for brevity, but keep them in your file!) ...
  useEffect(() => {
    const storedCart = localStorage.getItem('FOODIE_CART');
    if (storedCart) setCartItems(JSON.parse(storedCart));
    const storedOrders = localStorage.getItem('FOODIE_ORDERS');
    if (storedOrders) setOrderHistory(JSON.parse(storedOrders));
    else localStorage.setItem('FOODIE_ORDERS', JSON.stringify(initialOrders));
  }, []);

  useEffect(() => { localStorage.setItem('FOODIE_CART', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem('FOODIE_ORDERS', JSON.stringify(orderHistory)); }, [orderHistory]);

  // ... (Keep addToCart, removeFromCart, deleteItemFromCart) ...
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) return prevItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...prevItems, { ...product, quantity }];
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

  // 1. HELPER: Generate random time between 5000ms (5s) and 15000ms (15s)
  const getRandomTime = () => Math.floor(Math.random() * (15000 - 5000 + 1) + 5000);

  const processOrder = (paidItemIds, totalAmount, userId) => {
    setCartItems(prevItems => prevItems.filter(item => !paidItemIds.includes(item.id)));
    setCheckoutItems([]); 

    const newOrderId = `ORD-${Math.floor(Math.random() * 10000)}`;
    
    const newOrder = {
      id: newOrderId,
      userId: userId, 
      date: new Date().toLocaleDateString(),
      total: parseFloat(totalAmount),
      status: 'Cooking', // Start Here
      items: checkoutItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    setOrderHistory(prev => [newOrder, ...prev]);

    // 2. SIMULATION LOGIC (Nested Timeouts)
    const cookingTime = getRandomTime();
    console.log(`Cooking for ${cookingTime / 1000} seconds...`);

    setTimeout(() => {
      // Step 2: Waiting for Courier
      updateOrderStatus(newOrderId, 'Waiting for Courier');
      
      const courierTime = getRandomTime();
      console.log(`Courier arriving in ${courierTime / 1000} seconds...`);

      setTimeout(() => {
        // Step 3: On the Way
        updateOrderStatus(newOrderId, 'On the Way');
      }, courierTime);

    }, cookingTime);
  };

  // ... rest of context ...
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