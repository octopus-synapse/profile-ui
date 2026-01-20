import type { SeparatorProps } from "./separator.types";
import { separatorTokens } from "./separator.types";

export function useSeparator(props: SeparatorProps) {
 const { orientation = "horizontal", decorative = true } = props;
 return { orientation, decorative, ...separatorTokens };
}

export * from "./separator.types";
