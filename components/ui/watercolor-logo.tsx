import React from "react";
import Link from "next/link";
import Image from "next/image";

interface WatercolorLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function WatercolorLogo({ 
  className, 
  size = "md", 
  showText = true 
}: WatercolorLogoProps) {
  // Size mapping
  const sizes = {
    sm: { width: 40, height: 40 },
    md: { width: 60, height: 60 },
    lg: { width: 120, height: 120 },
  };

  const { width, height } = sizes[size];

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative">
        <Image
          src="/images/watercolor-eco-logo.png"
          alt="Local Eco Solve"
          width={width}
          height={height}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className="ml-3 font-semibold text-xl hidden sm:inline-block text-green-700">
          Local Eco Solve
        </span>
      )}
    </Link>
  );
} 