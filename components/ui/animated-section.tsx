'use client';

import React from 'react';
import { motion, Variants, TargetAndTransition, VariantLabels } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeIn, slideUp, staggerContainer } from '@/utils/animations';

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
  let variants: Variants;
  
  // Create variants based on animation type
  if (animation === 'fade') {
    variants = fadeIn('up', delay);
  } else if (animation === 'slide') {
    variants = slideUp;
  } else {
    variants = {}; // Empty variants for 'none'
  }
  
  // Custom transition with delay
  const transition = {
    duration,
    delay,
  };
  
  // If staggering is enabled, use the staggerContainer variant
  if (stagger) {
    // Create stagger container
    const staggerVariants = staggerContainer(staggerAmount, delay);
    
    return (
      <motion.div
        id={id}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={staggerVariants}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
  
  // Define animation states based on the animation prop
  const initialAnimation: VariantLabels | boolean = animation !== 'none' ? "hidden" : false;
  const animateState: TargetAndTransition | VariantLabels | boolean = animation !== 'none' ? "visible" : true; 
  const exitAnimation: VariantLabels | TargetAndTransition | undefined = animation !== 'none' ? "exit" : undefined;
  
  // Regular animation for the section
  return (
    <motion.section
      id={id}
      initial={initialAnimation}
      animate={animateState}
      exit={exitAnimation}
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
  let variants: Variants;
  
  // Create variants based on animation type
  if (animation === 'fade') {
    variants = fadeIn('up', delay);
  } else {
    variants = slideUp;
  }
  
  // Custom transition with delay
  const transition = {
    delay,
  };

  // Define animation properties with correct types
  const initialAnimation: VariantLabels = "hidden";
  const animateState: VariantLabels = "visible";
  const exitAnimation: VariantLabels = "exit";
  
  return (
    <motion.div
      initial={initialAnimation}
      animate={animateState}
      exit={exitAnimation}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}; 