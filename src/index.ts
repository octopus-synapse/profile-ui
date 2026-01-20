/**
 * Profile UI - Main Entry Point
 *
 * Architecture:
 * - system/      → Styled-system (shared style props)
 * - primitives/  → Layout primitives (Box, Stack, Text, Grid)
 * - theme/       → Theme system (ThemeProvider, useTheme)
 * - shared/      → Contracts, types, tokens, hooks (platform-agnostic)
 * - web/         → Web/Next.js implementations (react-dom, tailwind)
 * - mobile/      → React Native implementations (View, Text, Pressable)
 *
 * Bundler Resolution:
 * - Default export points to web implementations
 * - react-native condition resolves to mobile implementations
 * - Import from "./shared" for types/hooks only
 */

// Styled System (Chakra-UI inspired)
export * from "./system";

// Primitives (Box, Stack, Text, Grid)
export * from "./primitives";

// Theme System
export * from "./theme";

// Tokens (design tokens)
export * from "./tokens";

// Utils (cn, etc.)
export * from "./utils";
