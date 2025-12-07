// src/app/components/PageTransitionWrapper.js
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const pageTransitionVariants = {
  initial: { opacity: 0, x: -20, scale: 0.98 },
  animate: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: { duration: 0.4, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    x: 20, 
    scale: 0.98, 
    transition: { duration: 0.3, ease: "easeIn" } 
  },
};

export default function PageTransitionWrapper({ children }) {
  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
}