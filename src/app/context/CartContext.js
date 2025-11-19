// src/app/context/CartContext.js
'use client'; 

import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Function to remove or decrease quantity of an item (decrement button)
  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);

      if (existingItem.quantity === 1) {
        // If quantity is 1, remove item completely
        return prevItems.filter(item => item.id !== productId);
      } else {
        // If quantity is > 1, decrease quantity
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  // ✅ NEW FUNCTION: To remove an item completely (delete button)
  const deleteItemFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  // ------------------------------------------------------------------

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

  return (
    <CartContext.Provider value={{ 
        cartItems, 
        cartCount, 
        cartTotal, // ✅ Added cartTotal
        addToCart, 
        removeFromCart, 
        deleteItemFromCart // ✅ Exposed new function
      }}>
      {children}
    </CartContext.Provider>
  );
};