

import type { SpinnerSize } from "../spinner";

export interface LoadingStateProps {
 message?: string;
 size?: SpinnerSize;
 centered?: boolean;
 minHeight?: string | number;
 overlay?: boolean;
 testID?: string;
}

export const loadingStateTokens = {
 defaultMinHeight: 200,
 message: { fontSize: 14, color: "#a3a3a3" },
 overlay: { background: "rgba(2,2,2,0.8)" },
} as const;
