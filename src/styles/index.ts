


export * from "../tokens";


export const styleUtils = {
 
 pxToRem: (px: number, baseFontSize = 16): string => `${px / baseFontSize}rem`,

 
 cssVar: (name: string, fallback?: string): string =>
  fallback ? `var(--${name}, ${fallback})` : `var(--${name})`,

 
 transition: (
  properties: string | string[],
  duration = "150ms",
  easing = "ease-in-out"
 ): string => {
  const props = Array.isArray(properties) ? properties : [properties];
  return props.map((p) => `${p} ${duration} ${easing}`).join(", ");
 },
};
