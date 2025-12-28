import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind CSS conflict resolution
 * @example cn('px-2 py-1', condition && 'bg-black', 'px-4') => 'py-1 px-4 bg-black'
 */
export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}
