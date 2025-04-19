// Theme configuration for the application

// Color palette
export const colors = {
  // Primary colors
  primary: {
    50: '#eef7ee',
    100: '#d7ecd8',
    200: '#b4dab6',
    300: '#8eca93',
    400: '#66ba6f',
    500: '#4da654',
    600: '#3d8542',
    700: '#336335',
    800: '#254625',
    900: '#132413',
  },
  // Secondary colors
  secondary: {
    50: '#e6f2f8',
    100: '#cce5f0',
    200: '#99cbe1',
    300: '#66b1d2',
    400: '#3398c3',
    500: '#007eb4',
    600: '#006590',
    700: '#004c6c',
    800: '#003348',
    900: '#001924',
  },
  // Accent colors for highlights and CTA
  accent: {
    50: '#fff8e6',
    100: '#feefc0',
    200: '#fedf80',
    300: '#fdd040',
    400: '#fcc20e',
    500: '#e5ae00',
    600: '#b28800',
    700: '#806200',
    800: '#4d3a00',
    900: '#1a1400',
  },
  // Success, warning, error colors
  success: {
    light: '#d1fae5',
    default: '#10b981',
    dark: '#065f46',
  },
  warning: {
    light: '#fef3c7',
    default: '#f59e0b',
    dark: '#92400e',
  },
  error: {
    light: '#fee2e2',
    default: '#ef4444',
    dark: '#b91c1c',
  },
  info: {
    light: '#dbeafe',
    default: '#3b82f6',
    dark: '#1e40af',
  },
  // Neutral colors for text, backgrounds, etc.
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
};

// Typography
export const typography = {
  fontFamily: {
    sans: 'var(--font-sans)',
    mono: 'var(--font-mono)',
    display: 'var(--font-display)',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Spacing
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

// Borders
export const borders = {
  radius: {
    none: '0',
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  width: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

// Breakpoints for responsive design
export const breakpoints = {
  xs: '20rem', // 320px
  sm: '36rem', // 576px
  md: '48rem', // 768px
  lg: '62rem', // 992px
  xl: '75rem', // 1200px
  '2xl': '87.5rem', // 1400px
};

// Z-index values
export const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Transitions
export const transitions = {
  property: {
    common: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    colors: 'background-color, border-color, color, fill, stroke',
    dimensions: 'width, height',
    position: 'left, right, top, bottom',
    background: 'background-color, background-image, background-position',
  },
  duration: {
    'ultra-fast': '50ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    'ultra-slow': '500ms',
  },
  easing: {
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Theme object that brings everything together
export const theme = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  breakpoints,
  zIndices,
  transitions,
}; 