import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values into a single class string, using clsx for conditional classes
 * and tailwind-merge to properly merge Tailwind CSS classes.
 * 
 * @param inputs - Class values to merge together
 * @returns A single class string with properly merged Tailwind classes
 * 
 * @example
 * // Basic usage
 * cn("px-2 py-1", "bg-red-500", { "text-white": true })
 * // => "px-2 py-1 bg-red-500 text-white"
 * 
 * @example
 * // Merging conflicting classes
 * cn("px-2 py-1", "px-4") 
 * // => "py-1 px-4" (px-4 overrides px-2)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 