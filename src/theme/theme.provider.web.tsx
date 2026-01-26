

"use client";

import {
 createContext,
 useContext,
 useState,
 useEffect,
 useMemo,
 useCallback,
} from "react";
import type {
 ThemeContextValue,
 ThemeProviderProps,
 ColorMode,
} from "./theme.types";
import { darkTheme, lightTheme, createTheme } from "./theme.default";

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
 children,
 theme: themeOverrides,
 defaultColorMode = "dark",
 storageKey = "profile-ui-color-mode",
}: ThemeProviderProps) {
 const [colorMode, setColorModeState] = useState<ColorMode>(defaultColorMode);
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  setMounted(true);
  const stored = localStorage.getItem(storageKey) as ColorMode | null;
  if (stored) {
   setColorModeState(stored);
  }
 }, [storageKey]);

 const resolvedColorMode = useMemo(() => {
  if (colorMode === "system") {
   if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
     ? "dark"
     : "light";
   }
   return "dark";
  }
  return colorMode;
 }, [colorMode]);

 const theme = useMemo(() => {
  const baseTheme = resolvedColorMode === "dark" ? darkTheme : lightTheme;
  return createTheme({ ...baseTheme, ...themeOverrides });
 }, [resolvedColorMode, themeOverrides]);

 const setColorMode = useCallback(
  (mode: ColorMode) => {
   setColorModeState(mode);
   localStorage.setItem(storageKey, mode);
  },
  [storageKey],
 );

 const toggleColorMode = useCallback(() => {
  setColorMode(resolvedColorMode === "dark" ? "light" : "dark");
 }, [resolvedColorMode, setColorMode]);

 const value = useMemo<ThemeContextValue>(
  () => ({
   theme,
   colorMode,
   resolvedColorMode,
   setColorMode,
   toggleColorMode,
  }),
  [theme, colorMode, resolvedColorMode, setColorMode, toggleColorMode],
 );

 
 if (!mounted) {
  return null;
 }

 return (
  <ThemeContext.Provider value={value}>
   <div
    data-theme={resolvedColorMode}
    style={{
     backgroundColor: theme.colors.background,
     color: theme.colors.foreground,
     minHeight: "100vh",
    }}
   >
    {children}
   </div>
  </ThemeContext.Provider>
 );
}

export function useTheme(): ThemeContextValue {
 const context = useContext(ThemeContext);
 if (!context) {
  throw new Error("useTheme must be used within a ThemeProvider");
 }
 return context;
}

export function useThemeColors() {
 const { theme } = useTheme();
 return theme.colors;
}

export function useColorMode() {
 const { colorMode, resolvedColorMode, setColorMode, toggleColorMode } =
  useTheme();
 return { colorMode, resolvedColorMode, setColorMode, toggleColorMode };
}
