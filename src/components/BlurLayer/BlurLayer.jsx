'use client';
import React, { createContext, useContext, useEffect } from 'react';
import { cn } from '../../utils/lib';
import { usePathname } from 'next/navigation';

// Create context with a default value matching the shape of our context
const BlurContext = createContext({
  showBlur: false,
  setShowBlur: () => {},
});

// Custom hook for easier context usage
export function useBlur() {
  const context = useContext(BlurContext);
  if (!context) {
    throw new Error('useBlur must be used within a BlurProvider');
  }
  return context;
}

function BlurProvider({ children }) {
  const [showBlur, setShowBlur] = React.useState(false);

  const value = React.useMemo(() => ({ showBlur, setShowBlur }), [showBlur]);

  return <BlurContext.Provider value={value}>{children}</BlurContext.Provider>;
}

function BlurLayer() {
  const { showBlur, setShowBlur } = useBlur();
  const divRef = React.useRef(null);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!divRef.current || !mounted) return;
    if (showBlur) {
      divRef.current.classList.remove('hidden');
      divRef.current.classList.add('opacity-100');
      divRef.current.classList.remove('opacity-0');
    } else {
      divRef.current.classList.add('opacity-0');
      divRef.current.classList.remove('opacity-100');
      setTimeout(() => {
        divRef.current.classList.add('hidden');
      }, 300);
    }
  }, [showBlur]);

  useEffect(() => {
    if (showBlur) {
      setShowBlur(false);
    }
  }, [pathname]);

  return (
    <div
      ref={divRef}
      className={cn(
        'absolute h-full w-full min-h-dvh duration-300 min-w-dvw backdrop-blur-[2px] z-40 hidden opacity-0'
      )}
    ></div>
  );
}

export { BlurProvider, BlurLayer };
