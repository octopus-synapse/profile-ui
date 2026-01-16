/**
 * Avatar - Type Contract
 *
 * Single source of truth for Avatar types.
 * Both web and mobile implementations depend on this abstraction.
 *
 * @principle Dependency Inversion - High-level modules depend on abstractions
 * @layer Domain
 */

import type { ReactNode } from "react";

// =============================================================================
// Domain Types
// =============================================================================

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type AvatarShape = "circle" | "square";
export type AvatarStatus = "online" | "offline" | "away" | "busy";

// =============================================================================
// Component Contract
// =============================================================================

/**
 * Platform-agnostic Avatar props
 */
export interface AvatarProps {
 /** Image source URL */
 src?: string | null;
 /** Alt text for accessibility */
 alt?: string;
 /** Fallback text (name for initials) */
 fallback?: string;
 /** Size variant */
 size?: AvatarSize;
 /** Shape variant */
 shape?: AvatarShape;
 /** Ring emphasis */
 ring?: boolean;
 /** Status indicator */
 status?: AvatarStatus;
 /** Test identifier */
 testID?: string;
}

/**
 * Platform-agnostic AvatarGroup props
 */
export interface AvatarGroupProps {
 children: ReactNode;
 max?: number;
 size?: AvatarSize;
 shape?: AvatarShape;
 testID?: string;
}

// =============================================================================
// Design Tokens (Shared constants)
// =============================================================================

export const avatarTokens = {
 sizes: {
  xs: { dimension: 24, fontSize: 10 },
  sm: { dimension: 32, fontSize: 12 },
  md: { dimension: 40, fontSize: 14 },
  lg: { dimension: 48, fontSize: 16 },
  xl: { dimension: 64, fontSize: 18 },
  "2xl": { dimension: 80, fontSize: 20 },
  "3xl": { dimension: 96, fontSize: 24 },
 },
 shapes: {
  circle: { borderRadius: 9999 },
  square: { borderRadius: 8 },
 },
 status: {
  online: { color: "#22c55e", label: "Online" },
  offline: { color: "#a3a3a3", label: "Offline" },
  away: { color: "#f59e0b", label: "Away" },
  busy: { color: "#ef4444", label: "Busy" },
 },
 colors: {
  background: "#171717",
  text: "#a3a3a3",
  ring: "#06b6d4",
  border: "#020202",
 },
 group: {
  overlap: -8,
 },
} as const;

// =============================================================================
// Shared Utilities
// =============================================================================

/**
 * Extract initials from name
 */
export function getInitials(name: string): string {
 const words = name.trim().split(/\s+/);
 if (words.length === 1) {
  return words[0].substring(0, 2).toUpperCase();
 }
 return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
