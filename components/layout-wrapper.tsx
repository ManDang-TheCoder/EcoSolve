'use client';

import React, { useState, useEffect } from 'react';
import { Toaster } from "sonner";
import dynamic from 'next/dynamic';

// Simple placeholder components for SSR
const NavbarPlaceholder = () => <div className="h-16 bg-white border-b"></div>;
const FooterPlaceholder = () => <div className="bg-white border-t py-12"></div>;

// Use dynamic imports with error fallbacks and disable SSR
const Navbar = dynamic(() => import('@/components/navigation/navbar-simple').catch(() => () => <NavbarPlaceholder />), {
  ssr: false,
  loading: () => <NavbarPlaceholder />
});

const Footer = dynamic(() => import('@/components/simple-footer').catch(() => () => <FooterPlaceholder />), {
  ssr: false,
  loading: () => <FooterPlaceholder />
});

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  // Use client-side rendering for hydration issues
  const [isMounted, setIsMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Error fallback
  if (hasError) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavbarPlaceholder />
        <main className="flex-grow">
          {children}
        </main>
        <FooterPlaceholder />
      </div>
    );
  }

  // Loading state
  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavbarPlaceholder />
        <main className="flex-grow">{children}</main>
        <FooterPlaceholder />
      </div>
    );
  }

  // When components are ready
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
} 