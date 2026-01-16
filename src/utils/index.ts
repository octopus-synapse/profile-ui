/**
 * Utility functions
 * @layer Infrastructure
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind CSS support.
 * Uses clsx for conditional classes and tailwind-merge for deduplication.
 */
export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

/**
 * Generate initials from a name.
 * @example getInitials("John Doe") => "JD"
 */
export function getInitials(name: string, maxLength = 2): string {
 return name
  .split(" ")
  .map((word) => word.charAt(0))
  .join("")
  .toUpperCase()
  .slice(0, maxLength);
}
