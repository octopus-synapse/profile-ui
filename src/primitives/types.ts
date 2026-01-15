/**
 * Primitive Types
 * Platform-agnostic type definitions for UI primitives
 *
 * These types define the contract that both web and native
 * implementations must fulfill (Dependency Inversion Principle)
 */

import type { ReactNode, CSSProperties } from "react";

// ============================================================================
// Base Props (shared across all primitives)
// ============================================================================

export interface BaseProps {
 /** Children elements */
 children?: ReactNode;
 /** CSS class names (web) or style array (native via NativeWind) */
 className?: string;
 /** Test identifier */
 testID?: string;
}

// ============================================================================
// View Primitive
// ============================================================================

export interface ViewProps extends BaseProps {
 /** Inline styles (platform-resolved) */
 style?: CSSProperties | Record<string, unknown>;
 /** Accessibility role */
 role?: string;
 /** Accessible label */
 accessibilityLabel?: string;
}

// ============================================================================
// Text Primitive
// ============================================================================

export interface PlatformTextProps extends BaseProps {
 /** Inline styles */
 style?: CSSProperties | Record<string, unknown>;
 /** Number of lines before truncating (0 = no limit) */
 numberOfLines?: number;
 /** Allow text selection */
 selectable?: boolean;
 /** Accessibility role */
 role?: "heading" | "text" | "label";
 /** Heading level for accessibility */
 accessibilityLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

// ============================================================================
// Pressable Primitive
// ============================================================================

export interface PressableProps extends BaseProps {
 /** Press handler */
 onPress?: () => void;
 /** Long press handler */
 onLongPress?: () => void;
 /** Press in handler */
 onPressIn?: () => void;
 /** Press out handler */
 onPressOut?: () => void;
 /** Disabled state */
 disabled?: boolean;
 /** Inline styles */
 style?: CSSProperties | Record<string, unknown>;
 /** Accessibility role */
 role?: "button" | "link" | "menuitem" | "tab";
 /** Accessible label */
 accessibilityLabel?: string;
}

// ============================================================================
// Image Primitive
// ============================================================================

export interface ImageProps extends BaseProps {
 /** Image source - URL string or require() */
 source: string | { uri: string } | number;
 /** Alt text for accessibility */
 alt: string;
 /** Resize mode */
 resizeMode?: "cover" | "contain" | "stretch" | "center";
 /** Inline styles */
 style?: CSSProperties | Record<string, unknown>;
 /** Width */
 width?: number | string;
 /** Height */
 height?: number | string;
}

// ============================================================================
// TextInput Primitive
// ============================================================================

export interface TextInputProps extends BaseProps {
 /** Current value */
 value?: string;
 /** Change handler */
 onChangeText?: (text: string) => void;
 /** Placeholder text */
 placeholder?: string;
 /** Placeholder text color */
 placeholderTextColor?: string;
 /** Secure text entry (password) */
 secureTextEntry?: boolean;
 /** Keyboard type */
 keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "url";
 /** Auto capitalize */
 autoCapitalize?: "none" | "sentences" | "words" | "characters";
 /** Auto correct */
 autoCorrect?: boolean;
 /** Auto focus */
 autoFocus?: boolean;
 /** Editable state */
 editable?: boolean;
 /** Max length */
 maxLength?: number;
 /** Multiline */
 multiline?: boolean;
 /** Number of lines (multiline) */
 numberOfLines?: number;
 /** Submit handler */
 onSubmitEditing?: () => void;
 /** Focus handler */
 onFocus?: () => void;
 /** Blur handler */
 onBlur?: () => void;
 /** Inline styles */
 style?: CSSProperties | Record<string, unknown>;
 /** Accessible label */
 accessibilityLabel?: string;
}

// ============================================================================
// ScrollView Primitive
// ============================================================================

export interface ScrollViewProps extends BaseProps {
 /** Horizontal scroll */
 horizontal?: boolean;
 /** Show scroll indicator */
 showsScrollIndicator?: boolean;
 /** Inline styles */
 style?: CSSProperties | Record<string, unknown>;
 /** Content container style */
 contentContainerStyle?: CSSProperties | Record<string, unknown>;
}

// ============================================================================
// ActivityIndicator Primitive
// ============================================================================

export interface ActivityIndicatorProps extends BaseProps {
 /** Size */
 size?: "small" | "large" | number;
 /** Color */
 color?: string;
 /** Animating state */
 animating?: boolean;
}

// ============================================================================
// Platform Detection
// ============================================================================

export type Platform = "web" | "ios" | "android" | "native";

export interface PlatformSelect<T> {
 web?: T;
 ios?: T;
 android?: T;
 native?: T;
 default: T;
}
