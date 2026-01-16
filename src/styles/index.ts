/**
 * Styles - Global CSS utilities and style constants
 * @layer Infrastructure
 */

// Re-export tokens for backward compatibility
export * from "../tokens";

// CSS-in-JS utilities
export const styleUtils = {
 /**
  * Convert a pixel value to rem
  */
 pxToRem: (px: number, baseFontSize = 16): string => `${px / baseFontSize}rem`,

 /**
  * Generate a CSS variable reference
  */
 cssVar: (name: string, fallback?: string): string =>
  fallback ? `var(--${name}, ${fallback})` : `var(--${name})`,

 /**
  * Create a transition string
  */
 transition: (
  properties: string | string[],
  duration = "150ms",
  easing = "ease-in-out"
 ): string => {
  const props = Array.isArray(properties) ? properties : [properties];
  return props.map((p) => `${p} ${duration} ${easing}`).join(", ");
 },
};
