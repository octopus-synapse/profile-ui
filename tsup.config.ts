import { defineConfig } from "tsup";

export default defineConfig([
 // Main build with DTS (web + shared)
 {
  entry: {
   index: "src/index.ts",
   "tokens/index": "src/tokens/index.ts",
   "styles/index": "src/styles/index.ts",
   "shared/index": "src/shared/index.ts",
   "web/index": "src/web/index.ts",
   "hooks/index": "src/hooks/index.ts",
   "utils/index": "src/utils/index.ts",
   "types/index": "src/types/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom", "react-native"],
  esbuildOptions(options) {
   options.banner = {
    js: '"use client";',
   };
  },
 },
 // Mobile build (React Native) - without DTS due to RN type dependencies
 {
  entry: {
   "mobile/index": "src/mobile/index.ts",
  },
  format: ["cjs", "esm"],
  dts: false,
  splitting: true,
  sourcemap: true,
  clean: false, // Don't clean to preserve other build output
  treeshake: true,
  external: ["react", "react-dom", "react-native"],
  esbuildOptions(options) {
   options.banner = {
    js: '"use client";',
   };
  },
 },
]);
