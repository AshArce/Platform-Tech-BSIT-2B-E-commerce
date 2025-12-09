// src/app/context/CartContext.js
'use client'; 

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useProducts } from './ProductContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { fetchProducts } = useProducts(); 
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]); 

  // Load Cart from LocalStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('FOODIE_CART');
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => { 
    localStorage.setItem('FOODIE_CART', JSON.stringify(cartItems)); 
  }, [cartItems]);

  // Load REAL Orders
  useEffect(() => {
    fetchOrders();
  }, [currentUser]); 

  const fetchOrders = async () => {
    try {
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

  // --- CART ACTIONS ---
  const addToCart = (productToAdd) => {
    setCartItems(prevItems => {
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

  // --- ORDER LOGIC ---

  const processOrder = async (paidItemIds, totalAmount, userId) => {
    // Calculate dynamic cooking time
    const maxCookingSeconds = checkoutItems.reduce((max, item) => {
        const itemTime = item.cookingTime || 5; 
        return itemTime > max ? itemTime : max;
    }, 5);

    const cookingDelay = maxCookingSeconds * 1000; 
    console.log(`⏱️ Order will cook for ${maxCookingSeconds} seconds`);

    // 3. Prepare Data Payload (Now includes selectedOptions)
    const orderData = {
        userId: userId,
        total: parseFloat(totalAmount),
        items: checkoutItems.map(item => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            size: item.selectedSize,
            selectedOptions: item.selectedOptions
        }))
    };

    try {
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (res.ok) {
            const { order } = await res.json();
            
            setOrderHistory(prev => [order, ...prev]);
            setCartItems(prevItems => prevItems.filter(item => !paidItemIds.includes(item.cartId)));
            setCheckoutItems([]); 

            if (fetchProducts) {
               await fetchProducts(); 
            }

            // Simulation
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
        setOrderHistory(prev => prev.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));

        await fetch(`/api/orders/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

    } catch (error) {
        console.error("Update Status Failed:", error);
    }
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