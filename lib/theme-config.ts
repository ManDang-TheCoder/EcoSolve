/**
 * Theme configuration with design tokens for the application
 * This centralizes our design system variables
 */
export const themeConfig = {
  // Color palette
  colors: {
    primary: {
      50: 'var(--primary-50)',
      100: 'var(--primary-100)',
      200: 'var(--primary-200)',
      300: 'var(--primary-300)',
      400: 'var(--primary-400)',
      500: 'var(--primary-500)',
      600: 'var(--primary-600)',
      700: 'var(--primary-700)',
      800: 'var(--primary-800)',
      900: 'var(--primary-900)',
      950: 'var(--primary-950)',
    },
    secondary: {
      50: "hsl(210, 100%, 98%)",
      100: "hsl(214, 95%, 93%)",
      200: "hsl(213, 97%, 87%)",
      300: "hsl(212, 96%, 78%)",
      400: "hsl(213, 94%, 68%)",
      500: "hsl(217, 91%, 60%)",
      600: "hsl(221, 83%, 53%)",
      700: "hsl(224, 76%, 48%)",
      800: "hsl(226, 71%, 40%)",
      900: "hsl(224, 64%, 33%)",
      950: "hsl(226, 57%, 21%)",
    },
    accent: {
      50: 'var(--accent-50)',
      100: 'var(--accent-100)',
      200: 'var(--accent-200)',
      300: 'var(--accent-300)',
      400: 'var(--accent-400)',
      500: 'var(--accent-500)',
      600: 'var(--accent-600)',
      700: 'var(--accent-700)',
      800: 'var(--accent-800)',
      900: 'var(--accent-900)',
      950: 'var(--accent-950)',
    },
    gray: {
      50: "hsl(240, 20%, 99%)",
      100: "hsl(240, 12%, 96%)",
      200: "hsl(240, 11%, 91%)",
      300: "hsl(240, 9%, 82%)",
      400: "hsl(240, 7%, 67%)",
      500: "hsl(240, 5%, 54%)",
      600: "hsl(240, 5%, 43%)",
      700: "hsl(240, 4%, 36%)",
      800: "hsl(240, 4%, 25%)",
      900: "hsl(240, 6%, 17%)",
      950: "hsl(240, 9%, 9%)",
    },
    success: {
      light: 'var(--success-light)',
      DEFAULT: 'var(--success)',
      dark: 'var(--success-dark)',
      contrastText: "hsl(0, 0%, 100%)",
    },
    warning: {
      light: 'var(--warning-light)',
      DEFAULT: 'var(--warning)',
      dark: 'var(--warning-dark)',
      contrastText: "hsl(0, 0%, 0%)",
    },
    error: {
      light: 'var(--error-light)',
      DEFAULT: 'var(--error)',
      dark: 'var(--error-dark)',
      contrastText: "hsl(0, 0%, 100%)",
    },
    info: {
      light: 'var(--info-light)',
      DEFAULT: 'var(--info)',
      dark: 'var(--info-dark)',
      contrastText: "hsl(0, 0%, 100%)",
    },
    neutral: {
      50: 'var(--neutral-50)',
      100: 'var(--neutral-100)',
      200: 'var(--neutral-200)',
      300: 'var(--neutral-300)',
      400: 'var(--neutral-400)',
      500: 'var(--neutral-500)',
      600: 'var(--neutral-600)',
      700: 'var(--neutral-700)',
      800: 'var(--neutral-800)',
      900: 'var(--neutral-900)',
      950: 'var(--neutral-950)',
    }
  },
  
  // Typography
  fonts: {
    sans: 'var(--font-sans)',
    heading: 'var(--font-heading)',
    mono: 'var(--font-mono)',
  },
  fontSizes: {
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
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  
  // Spacing
  spacing: {
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
  },
  
  // Borders
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  borderWidth: {
    DEFAULT: '1px',
    0: '0',
    2: '2px',
    4: '4px',
    8: '8px',
  },
  
  // Shadows
  shadows: {
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
    '2xl': 'var(--shadow-2xl)',
    inner: 'var(--shadow-inner)',
  },
  
  // Transitions
  transitions: {
    duration: {
      fast: '150ms',
      default: '250ms',
      slow: '400ms',
      slower: '600ms',
    },
    timing: {
      default: 'cubic-bezier(0.16, 1, 0.3, 1)',
      linear: 'linear',
      ease: 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
    },
  },
  
  // Z-index
  zIndex: {
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    auto: 'auto',
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    drawer: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600,
    tooltip: 1700,
  },
  
  // Screen breakpoints (for responsive design)
  screens: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Container sizes
  containers: {
    xs: '20rem',    // 320px
    sm: '30rem',    // 480px
    md: '45rem',    // 720px
    lg: '60rem',    // 960px
    xl: '72rem',    // 1152px
    '2xl': '80rem', // 1280px
    '3xl': '90rem', // 1440px
    '4xl': '100rem', // 1600px
  },
}; 