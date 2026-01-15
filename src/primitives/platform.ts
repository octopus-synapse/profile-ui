/**
 * Platform Detection
 * Detects current platform at runtime
 *
 * This module provides platform detection that works in both
 * web and React Native environments.
 */

import type { Platform, PlatformSelect } from "./types";

/**
 * Detect current platform
 */
export function detectPlatform(): Platform {
 // Check if we're in React Native
 if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
  // Further detect iOS vs Android would require RN's Platform module
  return "native";
 }

 // Check if we're in a browser
 if (typeof window !== "undefined" && typeof document !== "undefined") {
  return "web";
 }

 // Default to web (SSR)
 return "web";
}

/**
 * Current platform (cached)
 */
export const currentPlatform: Platform = detectPlatform();

/**
 * Check if running on web
 */
export const isWeb = currentPlatform === "web";

/**
 * Check if running on native (iOS or Android)
 */
export const isNative =
 currentPlatform === "native" ||
 currentPlatform === "ios" ||
 currentPlatform === "android";

/**
 * Select value based on platform
 *
 * @example
 * const padding = select({
 *   web: '16px',
 *   native: 16,
 *   default: 16
 * });
 */
export function select<T>(options: PlatformSelect<T>): T {
 const platform = currentPlatform;

 if (platform === "web" && options.web !== undefined) {
  return options.web;
 }

 if (platform === "ios" && options.ios !== undefined) {
  return options.ios;
 }

 if (platform === "android" && options.android !== undefined) {
  return options.android;
 }

 if (isNative && options.native !== undefined) {
  return options.native;
 }

 return options.default;
}
