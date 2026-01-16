/**
 * Avatar - Base Component (Shared Logic)
 *
 * Contains platform-agnostic logic and hooks.
 * Web and Mobile implementations compose from this base.
 *
 * @principle Dependency Inversion
 * @layer Application
 */

import { useState, useCallback } from "react";
import type { AvatarProps } from "./Avatar.types";
import { avatarTokens, getInitials } from "./Avatar.types";

// =============================================================================
// Shared Hook
// =============================================================================

/**
 * useAvatar - Shared avatar logic
 *
 * Encapsulates state and derived values used by both implementations.
 */
export function useAvatar(props: AvatarProps) {
 const {
  src,
  fallback,
  size = "md",
  shape = "circle",
  ring = false,
  status,
 } = props;

 const [imageError, setImageError] = useState(false);

 const handleImageError = useCallback(() => {
  setImageError(true);
 }, []);

 const showImage = Boolean(src && src.trim() && !imageError);
 const initials = fallback ? getInitials(fallback) : null;

 const sizeToken = avatarTokens.sizes[size];
 const shapeToken = avatarTokens.shapes[shape];
 const statusToken = status ? avatarTokens.status[status] : null;

 return {
  // State
  showImage,
  imageError,
  handleImageError,

  // Derived
  initials,
  sizeToken,
  shapeToken,
  statusToken,

  // Props passthrough
  src,
  ring,
  size,
  shape,
  status,
 };
}

// =============================================================================
// Re-exports
// =============================================================================

export * from "./Avatar.types";
