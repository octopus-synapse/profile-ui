import type { SeparatorProps } from "./Separator.types";
import { separatorTokens } from "./Separator.types";

export function useSeparator(props: SeparatorProps) {
 const { orientation = "horizontal", decorative = true } = props;
 return { orientation, decorative, ...separatorTokens };
}

export * from "./Separator.types";
