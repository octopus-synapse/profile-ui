/**
 * Profile UI - Main Entry Point
 *
 * Architecture:
 * - shared/  → Contracts, types, tokens, hooks (platform-agnostic)
 * - web/     → Web/Next.js implementations (react-dom, tailwind)
 * - mobile/  → React Native implementations (View, Text, Pressable)
 *
 * Bundler Resolution:
 * - Default export points to web implementations
 * - react-native condition resolves to mobile implementations
 * - Import from "./shared" for types/hooks only
 */

// Tokens (design tokens)
export * from "./tokens";

// Utils (cn, etc.)
export * from "./utils";
