// src/app/context/ProductContext.js
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. FETCH from API on Load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setAllProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. ADD Product (API)
  const addProduct = async (newProduct) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      
      if (res.ok) {
        const { product } = await res.json();
        setAllProducts((prev) => [product, ...prev]); // Update UI immediately
      }
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  // 3. UPDATE Product (API)
  const updateProduct = async (updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (res.ok) {
        setAllProducts((prev) => 
          prev.map((p) => p.id === updatedProduct.id ? updatedProduct : p)
        );
      }
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  // 4. DELETE Product (API)
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setAllProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ allProducts, isLoading, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};