import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  // Size mapping
  const sizes = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
  };

  const { width, height } = sizes[size];

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative">
        {/* Earth logo */}
        <Image
          src="/images/eco-logo.png"
          alt="Local Eco Solve"
          width={width}
          height={height}
          className="object-contain"
          priority
        />
        
        {/* Leaves overlaid on top */}
        <div className="absolute -right-2 -bottom-2">
          <Image
            src="/images/leaf.png"
            alt=""
            width={width * 0.6}
            height={height * 0.6}
            className="object-contain"
          />
        </div>
        
        <div className="absolute -left-3 -bottom-1 transform -rotate-45">
          <Image
            src="/images/leaf.png"
            alt=""
            width={width * 0.5}
            height={height * 0.5}
            className="object-contain"
          />
        </div>
      </div>
      <span className="ml-3 font-semibold text-xl hidden sm:inline-block text-green-700">Local Eco Solve</span>
    </Link>
  );
} 