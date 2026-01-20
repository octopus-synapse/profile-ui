import type { SpinnerProps } from "./spinner.types";
import { spinnerTokens } from "./spinner.types";

export function useSpinner(props: SpinnerProps) {
 const { size = "md", colorScheme = "default" } = props;
 const dimension = spinnerTokens.sizes[size];
 const color = spinnerTokens.colors[colorScheme];
 const strokeWidth = spinnerTokens.strokeWidth[size];
 return { dimension, color, strokeWidth, size, colorScheme };
}

export * from "./spinner.types";
