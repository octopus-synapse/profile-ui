/**
 * Avatar - Web Module Public API
 *
 * @layer Infrastructure (Web)
 */

export { Avatar, AvatarGroup } from "./Avatar.web";
export type { WebAvatarProps, WebAvatarGroupProps } from "./Avatar.web";

// Re-export shared types
export type {
 AvatarProps,
 AvatarGroupProps,
 AvatarSize,
 AvatarShape,
 AvatarStatus,
} from "../../shared/Avatar";
export { avatarTokens } from "../../shared/Avatar";
