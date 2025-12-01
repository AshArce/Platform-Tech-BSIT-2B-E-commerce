// src/app/context/ThemeContext.js
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ColorModeContext = createContext({ 
  toggleColorMode: () => {},
  mode: 'light' 
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  // Load preference from LocalStorage on startup
  useEffect(() => {
    const savedMode = localStorage.getItem('FOODIE_THEME');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('FOODIE_THEME', newMode); // Save preference
          return newMode;
        });
      },
      mode,
    }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      {children}
    </ColorModeContext.Provider>
  );
};