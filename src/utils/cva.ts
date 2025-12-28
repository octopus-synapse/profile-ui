import {
 cva,
 type VariantProps as CVAVariantProps,
} from "class-variance-authority";

export { cva };
export type { CVAVariantProps };

/**
 * Type helper for extracting variant props from a cva config
 */
export type ExtractVariantProps<T extends (...args: any) => any> =
 CVAVariantProps<T>;
