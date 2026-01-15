// Legacy primitives (Tailwind-based, web only)
export * from "./Box";
export * from "./Stack";
export * from "./Grid";
export * from "./Text";

// Platform-agnostic primitive types
export * from "./types";
export * from "./platform";

// Web primitives (re-export with explicit names to avoid conflicts)
export {
 View,
 type WebViewProps,
 Pressable,
 type WebPressableProps,
 Image,
 type WebImageProps,
 TextInput,
 type WebTextInputProps,
 ScrollView,
 type WebScrollViewProps,
 ActivityIndicator,
 type WebActivityIndicatorProps,
} from "./web";
// Note: Text is already exported from ./Text, so we only export WebTextProps
export type { WebTextProps } from "./web";
