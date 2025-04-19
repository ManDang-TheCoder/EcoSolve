"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "card" | "text" | "avatar" | "button" | "input";
  animated?: boolean;
}

const pulseAnimation = {
  initial: { opacity: 0.5 },
  animate: { 
    opacity: [0.5, 0.8, 0.5],
    transition: { 
      duration: 1.5, 
      repeat: Infinity,
      ease: "easeInOut" 
    } 
  }
};

export function Skeleton({
  className,
  size = "md",
  variant = "default",
  animated = true,
  ...props
}: SkeletonProps) {
  // Set dimensions based on size
  const dimensions = {
    sm: "h-4",
    md: "h-6",
    lg: "h-8",
  };

  // Define base & variant-specific styles
  const baseStyles = cn(
    "bg-gray-200 rounded-md",
    dimensions[size],
    "w-full",
    className
  );

  const variantStyles = {
    default: "",
    text: "w-full",
    card: "w-full h-[200px]",
    avatar: "rounded-full",
    button: "rounded-md h-10 w-24",
    input: "h-10 rounded-md",
  };

  const Component = animated ? motion.div : "div";
  const animationProps = animated ? {
    variants: pulseAnimation,
    initial: "initial",
    animate: "animate"
  } : {};

  return (
    <Component
      className={cn(baseStyles, variantStyles[variant])}
      {...animationProps}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="pt-4">
          <Skeleton className="h-8 w-1/3" variant="button" />
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex items-center space-x-4 py-3">
      {[...Array(columns)].map((_, i) => (
        <Skeleton 
          key={i} 
          className={`h-4 ${i === 0 ? "w-1/6" : i === columns - 1 ? "w-1/12" : "w-1/5"}`}
        />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        {[...Array(rows)].map((_, i) => (
          <TableRowSkeleton key={i} columns={columns} />
        ))}
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-16 w-16" variant="avatar" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function CommentSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-8" variant="avatar" />
        <div className="space-y-1 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10" variant="input" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10" variant="input" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-20" variant="input" />
      </div>
      <Skeleton className="h-10 w-full" variant="button" />
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <Skeleton className="absolute inset-0 h-full" animated={true} />
      <div className="absolute top-4 right-4">
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
      <div className="absolute bottom-4 left-4 space-y-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
} 