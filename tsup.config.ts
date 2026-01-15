import { defineConfig } from "tsup";

export default defineConfig([
 // Main build with DTS (excludes native primitives)
 {
  entry: {
   index: "src/index.ts",
   "tokens/index": "src/tokens/index.ts",
   "styles/index": "src/styles/index.ts",
   "primitives/index": "src/primitives/index.ts",
   "primitives/web/index": "src/primitives/web/index.ts",
   "components/index": "src/components/index.ts",
   "layouts/index": "src/layouts/index.ts",
   "hooks/index": "src/hooks/index.ts",
   "utils/index": "src/utils/index.ts",
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
 // Native primitives build without DTS (requires RN environment for types)
 {
  entry: {
   "primitives/native/index": "src/primitives/native/index.ts",
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
