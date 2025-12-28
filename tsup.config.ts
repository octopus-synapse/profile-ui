import { defineConfig } from "tsup";

export default defineConfig({
 entry: {
  index: "src/index.ts",
  "tokens/index": "src/tokens/index.ts",
  "styles/index": "src/styles/index.ts",
  "primitives/index": "src/primitives/index.ts",
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
 external: ["react", "react-dom"],
 esbuildOptions(options) {
  options.banner = {
   js: '"use client";',
  };
 },
});
