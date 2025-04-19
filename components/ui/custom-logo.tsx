import React from "react";
import Link from "next/link";

interface CustomLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CustomLogo({ className, size = "md" }: CustomLogoProps) {
  // Size mapping
  const sizes = {
    sm: 40,
    md: 60,
    lg: 80,
  };

  const width = sizes[size];
  const height = sizes[size];

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative">
        <svg 
          width={width} 
          height={height} 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circle outline */}
          <circle cx="100" cy="100" r="90" stroke="#333333" strokeWidth="1" fill="none" />
          
          {/* Earth blue shapes */}
          <path 
            d="M100 20C140 40 160 80 160 100C160 120 140 160 100 180C60 160 40 120 40 100C40 80 60 40 100 20Z" 
            fill="#c6e6f7" 
            stroke="#555555" 
            strokeWidth="0.5" 
          />
          <path 
            d="M73.33 126.67C60 113.33 53.33 86.67 66.67 66.67C80 46.67 93.33 46.67 106.67 46.67C120 46.67 133.33 46.67 146.67 66.67C160 86.67 153.33 113.33 140 126.67Z" 
            fill="#418cca" 
            stroke="#555555" 
            strokeWidth="0.5" 
          />
          <path 
            d="M100 120L73.33 80L66.67 53.33L100 60L133.33 53.33L126.67 80Z" 
            fill="#014da4" 
            stroke="#555555" 
            strokeWidth="0.5" 
          />
          
          {/* Green leaves */}
          {/* Right leaf group */}
          <g transform="translate(120, 100) rotate(20)">
            <path 
              d="M0,0 L10,-40 L20,-5 Z" 
              fill="#4caf50" 
              stroke="#333333" 
              strokeWidth="0.5" 
            />
            <path 
              d="M0,0 L10,-40 L0,-5 Z" 
              fill="#388e3c" 
              stroke="#333333" 
              strokeWidth="0.5" 
            />
          </g>
          <g transform="translate(120, 100) rotate(60)">
            <path 
              d="M0,0 L10,-50 L20,-5 Z" 
              fill="#4caf50" 
              stroke="#333333" 
              strokeWidth="0.5" 
            />
            <path 
              d="M0,0 L10,-50 L0,-5 Z" 
              fill="#388e3c" 
              stroke="#333333" 
              strokeWidth="0.5" 
            />
          </g>
          
          {/* Left leaf group */}
          <g transform="translate(80, 100) rotate(160)">
            <path 
              d="M0,0 L10,-40 L20,-5 Z" 
              fill="#4caf50" 
              stroke="#333333" 
              strokeWidth="0.5" 
            />
            <path 
              d="M0,0 L10,-40 L0,-5 Z" 
              fill="#388e3c" 
              stroke="#333333" 
              strokeWidth="0.5" 
            />
          </g>
          <g transform="translate(80, 100) rotate(200)">
            <path 
              d="M0,0 L10,-50 L20,-5 Z" 
              fill="#4caf50" 
              stroke="#333333" 
              strokeWidth="0.5" 
            />
            <path 
              d="M0,0 L10,-50 L0,-5 Z" 
              fill="#388e3c" 
              stroke="#333333" 
              strokeWidth="0.5" 
            />
          </g>
        </svg>
      </div>
      <span className="ml-3 font-semibold text-xl hidden sm:inline-block text-green-700">Local Eco Solve</span>
    </Link>
  );
} 