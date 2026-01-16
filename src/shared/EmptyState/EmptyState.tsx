import type { EmptyStateProps } from "./EmptyState.types";
import { emptyStateTokens } from "./EmptyState.types";

export function useEmptyState(props: EmptyStateProps) {
 const { size = "md" } = props;
 const sizeToken = emptyStateTokens.sizes[size];
 return { sizeToken, size };
}

export * from "./EmptyState.types";
