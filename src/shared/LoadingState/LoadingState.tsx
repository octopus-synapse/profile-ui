import type { LoadingStateProps } from "./LoadingState.types";
import { loadingStateTokens } from "./LoadingState.types";

export function useLoadingState(props: LoadingStateProps) {
 const {
  size = "md",
  centered = true,
  minHeight = loadingStateTokens.defaultMinHeight,
  overlay = false,
 } = props;
 return { size, centered, minHeight, overlay };
}

export * from "./LoadingState.types";
