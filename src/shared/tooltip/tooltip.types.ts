

import type { ReactNode } from "react";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
 content: ReactNode;
 children: ReactNode;
 position?: TooltipPosition;
 delay?: number;
 disabled?: boolean;
 testID?: string;
}

export const tooltipTokens = {
 background: "#262626",
 text: "#ffffff",
 border: "rgba(255,255,255,0.1)",
 radius: 6,
 padding: { h: 12, v: 8 },
 fontSize: 12,
 offset: 8,
} as const;
