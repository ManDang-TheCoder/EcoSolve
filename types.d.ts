// types.d.ts
declare module 'lucide-react';
declare module 'next/link';
declare module 'next-themes';
declare module 'framer-motion';
declare module '@emotion/is-prop-valid';
declare module 'embla-carousel-react';
declare module 'react-day-picker';
declare module 'recharts';
declare module '@hookform/resolvers/zod';
declare module 'sonner';
declare module 'vaul';
declare module 'intersection-observer';
declare module 'smoothscroll-polyfill' {
  export function polyfill(): void;
  export default { polyfill };
}
declare module 'whatwg-fetch';

// Add missing React namespace
import * as React from 'react';

// Fix for JSX elements implicitly having 'any' type
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 