/** @type {import('jest').Config} */
module.exports = {
 preset: "ts-jest",
 testEnvironment: "jsdom",
 roots: ["<rootDir>/src"],
 moduleNameMapper: {
  "^@/(.*)$": "<rootDir>/src/$1",
 },
 setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
 testMatch: ["**/__tests__/**/*.test.ts?(x)", "**/*.test.ts?(x)"],
 collectCoverageFrom: [
  "src/**/*.{ts,tsx}",
  "!src/**/*.d.ts",
  "!src/**/index.ts",
  "!src/types/**/*",
 ],
 coverageThreshold: {
  global: {
   branches: 70,
   functions: 70,
   lines: 70,
   statements: 70,
  },
 },
 transform: {
  "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
 },
};
