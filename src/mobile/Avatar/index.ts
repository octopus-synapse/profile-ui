/**
 * Avatar - Mobile Module Public API
 *
 * @layer Infrastructure (Mobile)
 */

export { Avatar, AvatarGroup } from "./Avatar.mobile";

// Re-export shared types
export type {
 AvatarProps,
 AvatarGroupProps,
 AvatarSize,
 AvatarShape,
 AvatarStatus,
} from "../../shared/Avatar";
export { avatarTokens } from "../../shared/Avatar";
