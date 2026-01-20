/**
 * Avatar - Mobile Module Public API
 *
 * @layer Infrastructure (Mobile)
 */

export { Avatar, AvatarGroup } from "./avatar.component.mobile";

// Re-export shared types
export type {
 AvatarProps,
 AvatarGroupProps,
 AvatarSize,
 AvatarShape,
 AvatarStatus,
} from "../../shared/avatar";
export { avatarTokens } from "../../shared/avatar";
