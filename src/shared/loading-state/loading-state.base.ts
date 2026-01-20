import type { LoadingStateProps } from "./loading-state.types";
import { loadingStateTokens } from "./loading-state.types";

export function useLoadingState(props: LoadingStateProps) {
 const {
  size = "md",
  centered = true,
  minHeight = loadingStateTokens.defaultMinHeight,
  overlay = false,
 } = props;
 return { size, centered, minHeight, overlay };
}

export * from "./loading-state.types";
