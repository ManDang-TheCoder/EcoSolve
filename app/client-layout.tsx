'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { TailwindIndicator } from '@/components/tailwind-indicator';

const inter = Inter({ subsets: ['latin'] });

// Import components without SSR disabling
const ErrorBoundary = dynamic(() => import('@/components/error-boundary'));
const LayoutWrapper = dynamic(() => import('@/components/layout-wrapper'));

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <LayoutWrapper>{children}</LayoutWrapper>
            </ErrorBoundary>
          </Suspense>
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
} 