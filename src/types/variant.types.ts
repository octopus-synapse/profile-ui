/**
 * Tech Area Variants
 * Each variant represents a different tech specialization
 */
export const variants = ["dev", "product", "design", "data", "devops"] as const;
export type Variant = (typeof variants)[number];

/**
 * Component Size variants
 */
export const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
export type Size = (typeof sizes)[number];

/**
 * Component Intent variants
 */
export const intents = [
 "primary",
 "secondary",
 "ghost",
 "outline",
 "link",
] as const;
export type Intent = (typeof intents)[number];

/**
 * Base props for all variant-aware components
 */
export interface VariantProps {
 variant?: Variant;
}

/**
 * Base props for all sizeable components
 */
export interface SizeProps {
 size?: Size;
}

/**
 * Combined variant and size props
 */
export interface VariantSizeProps extends VariantProps, SizeProps {}
