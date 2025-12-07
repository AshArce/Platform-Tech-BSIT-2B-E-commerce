// src/app/components/SpinningLogoLoader.js
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, useTheme } from '@mui/material';
import Image from 'next/image';

// --- ANIMATION VARIANTS ---

// 1. Bike: Drive path (Left -> Center -> Right)
const driveVariants = {
  hidden: { x: '100vw' }, // Start off-screen RIGHT
  visible: {
    x: ['110vw', '0vw', '0vw', '-110vw'], // Enter from Right -> Stop -> Exit to Left
    transition: {
      duration: 3, 
      times: [0, 0.3, 0.7, 1],
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.2
    },
  },
};

// 2. Bike: Engine Rumble (Up/Down bounce)
const rumbleVariants = {
  rumble: {
    y: [0, -3, 0],
    transition: {
      duration: 0.2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// 3. Text: Container to stagger the wave
const textContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05, // Sped up slightly for longer text
    },
  },
};

// 4. Text: Individual Letter Wave
const textLetterVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0], // Move up 10px then back down
    transition: {
      duration: 1, // Speed of one wave
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.5 // Add a pause so long text is readable
    },
  },
};

// --- QUOTES ARRAY ---
const loadingQuotes = [
  "Charging up the e-bike",
  "Checking tire pressure",
  "E-BIKE EXPRESS ON YOUR WAY!!",
  "I MISS YOU DANICA </3 -MARCO",
  "Heating up the grill..",
  "Almost there...",
  "I LOVE YOU SIR JEBONE"
];

export default function SpinningLogoLoader() {
  const theme = useTheme();
  // Default to something simple to prevent server/client mismatch
  const [loadingText, setLoadingText] = useState("Loading...");

  // Set random quote on mount
  useEffect(() => {
    const randomQuote = loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)];
    setLoadingText(randomQuote);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      {/* --- MOTORCYCLE ANIMATION --- */}
      <motion.div
        variants={driveVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <motion.div
          variants={rumbleVariants}
          animate="rumble"
        >
          <Box
            sx={{
              position: 'relative',
              width: { xs: 100, sm: 120, md: 150 }, 
              height: { xs: 100, sm: 120, md: 150 },
              filter: 'drop-shadow(0px 10px 10px rgba(0,0,0,0.3)) inverted(1)'
            }}
          >
            <Image 
              src="/image/icon.png" 
              alt="Delivery Bike"
              fill
              sizes="(max-width: 768px) 100px, 150px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>
        </motion.div>
      </motion.div>
      
      {/* --- WAVING TEXT ANIMATION --- */}
      <motion.div
        variants={textContainerVariants}
        initial="initial"
        animate="animate"
        key={loadingText} // Re-trigger animation if text changes
        style={{
          marginTop: '20px',
          display: 'flex',
          gap: '2px', // Reduced gap slightly to fit longer quotes better
          flexWrap: 'wrap', // Allow wrapping on small screens if quote is long
          justifyContent: 'center'
        }}
      >
        {loadingText.split("").map((letter, index) => (
          <motion.span
            key={index}
            variants={textLetterVariants}
            style={{
              display: 'inline-block',
              fontSize: '1.2rem',
              fontWeight: 600,
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            {/* Preserve spaces */}
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    </Box>
  );
}