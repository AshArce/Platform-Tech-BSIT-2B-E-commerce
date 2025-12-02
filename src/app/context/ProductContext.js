// src/app/context/ProductContext.js
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { products as initialProducts } from '../../data/products';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);

  // Load products from LocalStorage or fallback to data file
  useEffect(() => {
    const storedProducts = localStorage.getItem('FOODIE_PRODUCTS');
    if (storedProducts) {
      setAllProducts(JSON.parse(storedProducts));
    } else {
      setAllProducts(initialProducts);
      localStorage.setItem('FOODIE_PRODUCTS', JSON.stringify(initialProducts));
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    if (allProducts.length > 0) {
      localStorage.setItem('FOODIE_PRODUCTS', JSON.stringify(allProducts));
    }
  }, [allProducts]);

  // --- ACTIONS ---

  const addProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: Date.now() }; // Generate ID
    setAllProducts([productWithId, ...allProducts]);
  };

  const updateProduct = (updatedProduct) => {
    setAllProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id) => {
    setAllProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ allProducts, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};