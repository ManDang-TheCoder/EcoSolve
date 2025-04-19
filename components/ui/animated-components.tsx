"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  fadeInOut, 
  slideUp, 
  staggerContainer, 
  staggerItem, 
  modalAnimation,
  scaleInOut,
  transitions,
  spinnerAnimation,
  logoAnimation,
  pulseAnimation,
  cardHover
} from "@/lib/animations";

// AnimatedContainer - Base container with animation capabilities
export const AnimatedContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variants?: any;
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    layoutId?: string;
    layout?: boolean | "position" | "size";
    whileHover?: any;
    whileTap?: any;
  }
>(({ className, variants, initial, animate, exit, transition, layoutId, layout, whileHover, whileTap, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(className)}
    variants={variants}
    initial={initial}
    animate={animate}
    exit={exit}
    transition={transition}
    layoutId={layoutId}
    layout={layout}
    whileHover={whileHover}
    whileTap={whileTap}
    {...props}
  />
));
AnimatedContainer.displayName = "AnimatedContainer";

// FadeIn - Element that fades in
export const FadeIn = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    delay?: number;
  }
>(({ className, delay = 0, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ ...transitions.smooth, delay }}
    {...props}
  />
));
FadeIn.displayName = "FadeIn";

// SlideUp - Element that slides up when it appears
export const SlideUp = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    delay?: number;
    distance?: number;
  }
>(({ className, delay = 0, distance = 20, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(className)}
    initial={{ opacity: 0, y: distance }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ ...transitions.smooth, delay }}
    {...props}
  />
));
SlideUp.displayName = "SlideUp";

// AnimatedList - Container for staggered list animations
export const AnimatedList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    staggerDelay?: number;
    childrenDelay?: number;
  }
>(({ className, staggerDelay = 0.1, childrenDelay = 0.05, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(className)}
    initial="initial"
    animate="animate"
    exit="exit"
    variants={{
      animate: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: childrenDelay,
        },
      },
      exit: {
        transition: {
          staggerChildren: staggerDelay / 2,
          staggerDirection: -1,
        },
      },
    }}
    {...props}
  />
));
AnimatedList.displayName = "AnimatedList";

// AnimatedListItem - Item to be used inside AnimatedList
export const AnimatedListItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    customVariants?: any;
  }
>(({ className, customVariants, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(className)}
    variants={customVariants || staggerItem}
    {...props}
  />
));
AnimatedListItem.displayName = "AnimatedListItem";

// AnimatedModal - A modal with entrance/exit animations
export const AnimatedModal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean;
    onClose: () => void;
    overlayClassName?: string;
    contentClassName?: string;
  }
>(({ className, isOpen, onClose, overlayClassName, contentClassName, children, ...props }, ref) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        ref={ref}
        className={cn("fixed inset-0 z-50 flex items-center justify-center", overlayClassName)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        {...props}
      >
        <motion.div
          className={cn("bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl max-w-md w-full mx-4", contentClassName)}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={transitions.smooth}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
));
AnimatedModal.displayName = "AnimatedModal";

// AnimatedButton - Button with hover/tap animations
export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "ghost" | "subtle";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    default: "bg-primary text-white hover:bg-primary/90 focus:ring-primary/50",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500/30",
    subtle: "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-500/30",
  };
  
  return (
    <motion.button
      ref={ref}
      className={cn(baseClasses, variantClasses[variant], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={transitions.fast}
      {...props}
    />
  );
});
AnimatedButton.displayName = "AnimatedButton";

// AnimatedCard - Card with hover animations
export const AnimatedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hoverEffect?: boolean;
  }
>(({ className, hoverEffect = true, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden", className)}
    initial="rest"
    whileHover={hoverEffect ? "hover" : "rest"}
    variants={hoverEffect ? cardHover : undefined}
    {...props}
  />
));
AnimatedCard.displayName = "AnimatedCard";

// AnimatedImage - Image with loading animation
export const AnimatedImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & {
    containerClassName?: string;
  }
>(({ className, containerClassName, ...props }, ref) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  return (
    <div className={cn("overflow-hidden relative", containerClassName)}>
      <motion.img
        ref={ref}
        className={cn("w-full h-full object-cover", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 bg-gray-200 dark:bg-gray-700"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
});
AnimatedImage.displayName = "AnimatedImage";

// LoadingSpinner - Animated loading spinner
export const LoadingSpinner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: "sm" | "md" | "lg";
    color?: string;
  }
>(({ className, size = "md", color = "currentColor", ...props }, ref) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };
  
  return (
    <motion.div
      ref={ref}
      className={cn("rounded-full border-t-transparent", sizeClasses[size], className)}
      style={{ borderColor: `${color}40`, borderTopColor: "transparent" }}
      variants={spinnerAnimation}
      animate="animate"
      {...props}
    />
  );
});
LoadingSpinner.displayName = "LoadingSpinner";

// PageTransition - Wrapper for page transitions
export const PageTransition = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("w-full", className)}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
    {...props}
  >
    {children}
  </motion.div>
));
PageTransition.displayName = "PageTransition";

// AnimatedLogo - Logo with entrance animation
export const AnimatedLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(className)}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 15,
    }}
    {...props}
  >
    {children}
  </motion.div>
));
AnimatedLogo.displayName = "AnimatedLogo";

// NotificationBadge - Animated notification badge
export const NotificationBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    count?: number;
    pulse?: boolean;
  }
>(({ className, count, pulse = true, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full text-xs font-medium bg-red-500 text-white", className)}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={transitions.bounce}
    variants={pulse ? pulseAnimation : undefined}
    animate={pulse ? "animate" : undefined}
    {...props}
  >
    {count}
  </motion.div>
));
NotificationBadge.displayName = "NotificationBadge";

// AnimatedCollapse - Collapsible section with animation
export const AnimatedCollapse = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean;
  }
>(({ className, isOpen, children, ...props }, ref) => (
  <AnimatePresence initial={false}>
    {isOpen && (
      <motion.div
        ref={ref}
        className={cn("overflow-hidden", className)}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={transitions.smooth}
        {...props}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
));
AnimatedCollapse.displayName = "AnimatedCollapse";

// SkeletonLoader - Animated skeleton for loading states
export const SkeletonLoader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "text" | "rectangular" | "circular";
    width?: string | number;
    height?: string | number;
  }
>(({ className, variant = "text", width, height, ...props }, ref) => {
  const variantClasses = {
    text: "h-4 w-full rounded",
    rectangular: "rounded-md",
    circular: "rounded-full",
  };
  
  return (
    <motion.div
      ref={ref}
      className={cn("bg-gray-200 dark:bg-gray-700 animate-pulse", variantClasses[variant], className)}
      style={{ width, height }}
      {...props}
    />
  );
});
SkeletonLoader.displayName = "SkeletonLoader"; 