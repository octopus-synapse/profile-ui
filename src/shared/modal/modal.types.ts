

import type { ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
 open: boolean;
 onClose: () => void;
 children: ReactNode;
 size?: ModalSize;
 closeOnOverlayClick?: boolean;
 testID?: string;
}

export interface ModalHeaderProps {
 children: ReactNode;
}
export interface ModalTitleProps {
 children: ReactNode;
}
export interface ModalDescriptionProps {
 children: ReactNode;
}
export interface ModalFooterProps {
 children: ReactNode;
}
export interface ModalCloseButtonProps {
 onPress: () => void;
}

export const modalTokens = {
 overlay: { background: "rgba(0,0,0,0.8)", blur: 4 },
 content: {
  background: "#171717",
  border: "rgba(255,255,255,0.1)",
  radius: 12,
 },
 sizes: {
  sm: { maxWidth: 384, padding: 16 },
  md: { maxWidth: 448, padding: 24 },
  lg: { maxWidth: 512, padding: 24 },
  xl: { maxWidth: 576, padding: 32 },
  full: { maxWidth: "100%", padding: 24 },
 },
 title: { fontSize: 18, color: "#ffffff" },
 description: { fontSize: 14, color: "#a3a3a3" },
} as const;
