'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeIn, slideUp, staggerChildren } from '@/utils/animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fade' | 'slide' | 'none';
  stagger?: boolean;
  staggerAmount?: number;
  id?: string;
  as?: React.ElementType;
}

export const AnimatedSection = ({
  children,
  className,
  delay = 0,
  duration = 0.4,
  animation = 'fade',
  stagger = false,
  staggerAmount = 0.1,
  id,
  as: Component = 'section',
}: AnimatedSectionProps) => {
  // Animation variants
  let variants = fadeIn; // Default
  
  if (animation === 'slide') {
    variants = slideUp;
  } else if (animation === 'none') {
    variants = {};
  }
  
  // Custom transition with delay
  const transition = {
    ...variants.visible?.transition,
    delay,
    duration,
  };
  
  // If staggering is enabled, use the staggerChildren variant
  if (stagger) {
    return (
      <motion.div
        id={id}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={staggerChildren}
        transition={{ staggerChildren: staggerAmount, delayChildren: delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
  
  // Regular animation for the section
  return (
    <motion.section
      id={id}
      initial={animation !== 'none' ? "hidden" : false}
      animate={animation !== 'none' ? "visible" : false}
      exit={animation !== 'none' ? "exit" : false}
      variants={variants}
      transition={transition}
      className={cn('', className)}
    >
      {children}
    </motion.section>
  );
};

// Child item for staggered animations
export const AnimatedItem = ({
  children,
  className,
  delay = 0,
  animation = 'fade',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade' | 'slide';
}) => {
  // Animation variants
  let variants = fadeIn; // Default
  
  if (animation === 'slide') {
    variants = slideUp;
  }
  
  // Custom transition with delay
  const transition = {
    ...variants.visible?.transition,
    delay,
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}; 