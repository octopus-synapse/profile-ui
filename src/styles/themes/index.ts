export * from "./base";
export * from "./dev";
export * from "./product";
export * from "./design";
export * from "./data";
export * from "./devops";

import { devTheme } from "./dev";
import { productTheme } from "./product";
import { designTheme } from "./design";
import { dataTheme } from "./data";
import { devopsTheme } from "./devops";
import type { Variant } from "../../types";

/**
 * All variant themes
 */
export const variantThemes = {
 dev: devTheme,
 product: productTheme,
 design: designTheme,
 data: dataTheme,
 devops: devopsTheme,
} as const;

/**
 * Get theme for a specific variant
 */
export function getVariantTheme(variant: Variant) {
 return variantThemes[variant];
}
