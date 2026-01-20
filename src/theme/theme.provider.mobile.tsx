/**
 * ThemeProvider - Mobile Implementation
 *
 * @layer Infrastructure (Mobile)
 */

import {
 createContext,
 useContext,
 useState,
 useMemo,
 useCallback,
} from "react";
import { useColorScheme } from "react-native";
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
 defaultColorMode = "system",
}: ThemeProviderProps) {
 const systemColorScheme = useColorScheme();
 const [colorMode, setColorModeState] = useState<ColorMode>(defaultColorMode);

 const resolvedColorMode = useMemo(() => {
  if (colorMode === "system") {
   return systemColorScheme === "dark" ? "dark" : "light";
  }
  return colorMode;
 }, [colorMode, systemColorScheme]);

 const theme = useMemo(() => {
  const baseTheme = resolvedColorMode === "dark" ? darkTheme : lightTheme;
  return createTheme({ ...baseTheme, ...themeOverrides });
 }, [resolvedColorMode, themeOverrides]);

 const setColorMode = useCallback((mode: ColorMode) => {
  setColorModeState(mode);
  // For persistence on mobile, use AsyncStorage (not included to avoid dependency)
 }, []);

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

 return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
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
