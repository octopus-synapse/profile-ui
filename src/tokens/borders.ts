/**
 * Border radius
 */
export const borderRadius = {
 none: "0px",
 sm: "2px",
 DEFAULT: "4px",
 md: "6px",
 lg: "8px",
 xl: "12px",
 "2xl": "16px",
 "3xl": "24px",
 full: "9999px",
} as const;

/**
 * Border width
 */
export const borderWidth = {
 0: "0px",
 DEFAULT: "1px",
 2: "2px",
 4: "4px",
 8: "8px",
} as const;

export type BorderRadius = keyof typeof borderRadius;
export type BorderWidth = keyof typeof borderWidth;
