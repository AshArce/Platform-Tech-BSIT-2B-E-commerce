// src/app/components/AnimatePresenceRouter.js
'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import PageTransitionWrapper from './PageTransitionWrapper';
import SpinningLogoLoader from './SpinningLogoLoader';

export default function AnimatePresenceRouter({ children }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // 1. Start the loading visual immediately when path changes
    setIsTransitioning(true);

    // 2. Turn it off after 3 seconds (3000ms)
    const timer = setTimeout(() => {
        setIsTransitioning(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Show the full-screen loader if transitioning */}
      {isTransitioning && <SpinningLogoLoader />}

      <AnimatePresence mode="wait">
        <PageTransitionWrapper key={pathname}>
          {children}
        </PageTransitionWrapper>
      </AnimatePresence>
    </>
  );
}