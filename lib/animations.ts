/**
 * Animation utilities for the application
 * Contains Framer Motion variants for common animations
 */
import { Variant } from "framer-motion";
import { themeConfig } from "./theme-config";

// Types
type Direction = "up" | "down" | "left" | "right";
type Variants = Record<string, Variant>;

// Common transition presets
export const transitions = {
  fast: {
    type: "spring",
    stiffness: 500,
    damping: 30,
    duration: 0.1,
  },
  smooth: {
    type: "spring",
    stiffness: 300,
    damping: 25,
    duration: 0.2,
  },
  gentle: {
    type: "spring",
    stiffness: 200,
    damping: 20,
    duration: 0.3,
  },
  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 10,
    duration: 0.4,
  },
  slowBounce: {
    type: "spring",
    stiffness: 100,
    damping: 8,
    duration: 0.6,
  },
  eased: {
    type: "tween",
    ease: [0.16, 1, 0.3, 1], // Custom bezier curve
    duration: 0.4,
  },
};

// Basic fade in/out animation
export const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: transitions.smooth,
};

// Slide up animation with fade
export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
  transition: transitions.smooth,
};

// Slide in from a direction
export const slideIn = (direction: Direction = "left", distance: number = 30) => {
  const x = direction === "left" ? -distance : direction === "right" ? distance : 0;
  const y = direction === "up" ? -distance : direction === "down" ? distance : 0;
  
  return {
    initial: { x, y, opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: { x: direction === "left" ? distance : direction === "right" ? -distance : 0, 
            y: direction === "up" ? distance : direction === "down" ? -distance : 0, 
            opacity: 0 },
    transition: transitions.smooth,
  };
};

// Slide in from left
export const slideInLeft = slideIn("left");

// Slide in from right
export const slideInRight = slideIn("right");

// Scale animation
export const scaleInOut = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: transitions.smooth,
};

// Staggered children animation container
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// Staggered item animation
export const staggerItem = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
  transition: transitions.smooth,
};

// Page transition animation
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },
};

// Modal animation
export const modalAnimation = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  content: {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.98 },
    transition: transitions.smooth,
  },
};

// Tooltip animation
export const tooltipAnimation = {
  initial: { opacity: 0, y: 5, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 5, scale: 0.95 },
  transition: { duration: 0.15 },
};

// List item hover animation
export const listItemHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -2 },
  transition: transitions.gentle,
};

// Button hover animation
export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.98 },
  transition: transitions.fast,
};

// Card hover animation
export const cardHover = {
  rest: { y: 0, boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" },
  hover: { 
    y: -5, 
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
    transition: transitions.gentle,
  },
};

// Loading spinner animation
export const spinnerAnimation = {
  animate: { 
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear",
    }
  }
};

// Logo animation
export const logoAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    }
  },
};

// Pulse animation (for notifications, etc.)
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
    }
  }
};

// Create an animation that reveals text letter by letter
export const textReveal = {
  container: {
    initial: { opacity: 1 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    }
  },
  letter: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: transitions.smooth,
    }
  }
};

// Helper function to split text for the text reveal animation
export const splitText = (text: string) => {
  return text.split("").map((char, i) => (
    char === " " ? " " : char
  ));
};

// Layout change animation (for responsive layouts)
export const layoutAnimation = {
  layout: true,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  }
};

// Scroll-triggered animations
export const fadeInOnScroll = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: transitions.smooth,
};

// Grow on scroll animation
export const growOnScroll = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: transitions.gentle,
};

// Parallax effect on scroll
export const parallaxScroll = (speed: number = 0.5) => ({
  initial: { y: 0 },
  animate: (scrollY: number) => ({
    y: -scrollY * speed,
  }),
});

// Blurred overlay animation
export const blurredOverlay = {
  initial: { opacity: 0, backdropFilter: "blur(0px)" },
  animate: { opacity: 1, backdropFilter: "blur(5px)" },
  exit: { opacity: 0, backdropFilter: "blur(0px)" },
  transition: { duration: 0.3 },
};

// Export all animations as a collection
export const animations = {
  fadeInOut,
  slideUp,
  slideIn,
  slideInLeft,
  slideInRight,
  scaleInOut,
  staggerContainer,
  staggerItem,
  pageTransition,
  modalAnimation,
  tooltipAnimation,
  listItemHover,
  buttonHover,
  cardHover,
  spinnerAnimation,
  logoAnimation,
  pulseAnimation,
  textReveal,
  layoutAnimation,
  fadeInOnScroll,
  growOnScroll,
  parallaxScroll,
  blurredOverlay,
}; 