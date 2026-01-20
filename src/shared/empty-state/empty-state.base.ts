import type { EmptyStateProps } from "./empty-state.types";
import { emptyStateTokens } from "./empty-state.types";

export function useEmptyState(props: EmptyStateProps) {
 const { size = "md" } = props;
 const sizeToken = emptyStateTokens.sizes[size];
 return { sizeToken, size };
}

export * from "./empty-state.types";
