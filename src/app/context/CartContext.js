// src/app/context/CartContext.js
'use client'; 

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Needed to filter orders by user

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]); 

  // 1. Load Cart from LocalStorage (Cart stays local for speed/guest users)
  useEffect(() => {
    const storedCart = localStorage.getItem('FOODIE_CART');
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => { 
    localStorage.setItem('FOODIE_CART', JSON.stringify(cartItems)); 
  }, [cartItems]);

  // 2. Load REAL Orders from API
  useEffect(() => {
    fetchOrders();
  }, [currentUser]); // Reload when user changes

  const fetchOrders = async () => {
    try {
      // Logic: If Admin, fetch ALL. If User, fetch only theirs.
      let url = '/api/orders';
      if (currentUser && currentUser.role !== 'System Administrator') {
        url = `/api/orders?userId=${currentUser.id}`;
      }
      
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setOrderHistory(data);
      }
    } catch (error) {
      console.error("Failed to load orders", error);
    }
  };

  // --- CART ACTIONS (Local Only) ---
  const addToCart = (productToAdd) => {
    setCartItems(prevItems => {
      // Check for item with same ID AND same options (using cartId)
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

  const removeFromCart = (cartId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.cartId === cartId);
      if (!existingItem) return prevItems;
      
      if (existingItem.quantity === 1) {
        return prevItems.filter(item => item.cartId !== cartId);
      }
      return prevItems.map(item => item.cartId === cartId ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  const deleteItemFromCart = (cartId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
  };

  // --- ORDER LOGIC (API Connected) ---

  const processOrder = async (paidItemIds, totalAmount, userId) => {
    // 1. Calculate Dynamic Cooking Time
    // Find the item with the longest cooking time in the cart. Default to 5s.
    const maxCookingSeconds = checkoutItems.reduce((max, item) => {
        // If cookingTime is undefined, use 5 as fallback
        const itemTime = item.cookingTime || 5; 
        return itemTime > max ? itemTime : max;
    }, 5);

    const cookingDelay = maxCookingSeconds * 1000; // Convert to ms
    console.log(`⏱️ Order will cook for ${maxCookingSeconds} seconds`);

    // 2. Prepare Data Payload
const orderData = {
        userId: userId,
        total: parseFloat(totalAmount),
        items: checkoutItems.map(item => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            size: item.selectedSize
        }))
    };

    try {
        // 3. Send to API
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (res.ok) {
            const { order } = await res.json();
            
            // 4. Update Local State (Immediate Feedback)
            setOrderHistory(prev => [order, ...prev]);
            
            // 5. Clear Purchased Items from Cart
            setCartItems(prevItems => prevItems.filter(item => !paidItemIds.includes(item.cartId)));
            setCheckoutItems([]); 

            // 🌟 6. SIMULATION: Auto-update to "On the Way" after cooking time
            setTimeout(() => {
                updateOrderStatus(order.id, 'On the Way');
            }, cookingDelay);
        }
    } catch (error) {
        console.error("Checkout Failed:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
        // Optimistic UI Update (Update screen instantly)
        setOrderHistory(prev => prev.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));

        // Call API to persist change
        await fetch(`/api/orders/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

    } catch (error) {
        console.error("Update Status Failed:", error);
    }
  };

  // Calculations
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