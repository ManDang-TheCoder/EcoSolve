'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Toaster } from "sonner";

// Dynamic imports moved to this client component
const Navbar = dynamic(() => import('@/components/navigation/navbar-simple'), { ssr: false });
const Footer = dynamic(() => import('@/components/simple-footer'), { ssr: false });

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
} 