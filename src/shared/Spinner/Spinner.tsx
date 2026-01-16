import type { SpinnerProps } from "./Spinner.types";
import { spinnerTokens } from "./Spinner.types";

export function useSpinner(props: SpinnerProps) {
 const { size = "md", colorScheme = "default" } = props;
 const dimension = spinnerTokens.sizes[size];
 const color = spinnerTokens.colors[colorScheme];
 const strokeWidth = spinnerTokens.strokeWidth[size];
 return { dimension, color, strokeWidth, size, colorScheme };
}

export * from "./Spinner.types";
