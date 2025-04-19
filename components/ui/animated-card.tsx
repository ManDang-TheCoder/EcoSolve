'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { scaleUp, hoverScale } from '@/utils/animations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  animate?: boolean;
  hover?: boolean;
  delay?: number;
  children?: React.ReactNode;
}

export const AnimatedCard = ({
  title,
  description,
  footer,
  headerClassName,
  contentClassName,
  footerClassName,
  titleClassName,
  descriptionClassName,
  animate = true,
  hover = true,
  delay = 0,
  className,
  children,
  ...props
}: AnimatedCardProps) => {
  // Base motion variants
  const cardVariants = {
    hidden: scaleUp.hidden,
    visible: {
      ...scaleUp.visible,
      transition: {
        ...scaleUp.visible.transition,
        delay: delay * 0.1, // Stagger based on provided delay
      },
    },
    exit: scaleUp.exit,
  };

  // Hover animation
  const hoverAnimation = hover
    ? {
        whileHover: hoverScale,
      }
    : {};

  return (
    <motion.div
      initial={animate ? 'hidden' : false}
      animate={animate ? 'visible' : false}
      exit={animate ? 'exit' : false}
      variants={cardVariants}
      {...hoverAnimation}
      className={cn('transition-all will-change-transform', className)}
      {...props}
    >
      <Card className="h-full overflow-hidden">
        {(title || description) && (
          <CardHeader className={cn('flex flex-col gap-1.5', headerClassName)}>
            {title && (
              <CardTitle className={cn('text-xl font-semibold', titleClassName)}>
                {title}
              </CardTitle>
            )}
            {description && (
              <CardDescription className={cn('text-sm text-muted-foreground', descriptionClassName)}>
                {description}
              </CardDescription>
            )}
          </CardHeader>
        )}
        
        {children && (
          <CardContent className={cn('pt-0', contentClassName)}>
            {children}
          </CardContent>
        )}
        
        {footer && (
          <CardFooter className={cn('flex justify-between items-center', footerClassName)}>
            {footer}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

// Export a simpler version for quick use
export const SimpleAnimatedCard = ({ children, className, delay = 0, ...props }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  [key: string]: any;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.4, 
          ease: [0.25, 0.1, 0.25, 1.0],
          delay: delay * 0.1
        }
      }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn('transition-all will-change-transform', className)}
      {...props}
    >
      <Card className="h-full overflow-hidden">
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}; 