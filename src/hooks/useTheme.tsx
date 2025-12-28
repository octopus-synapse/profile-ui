"use client";

import {
 createContext,
 useContext,
 useCallback,
 useState,
 useEffect,
 type ReactNode,
} from "react";
import type { Theme, ThemeMode, ThemeContextValue } from "../types";
import type { Variant } from "../types";
import { getThemeColors } from "../styles/themes/base";

const defaultTheme: Theme = {
 mode: "dark",
 variant: "dev",
 colors: getThemeColors("dev", "dark"),
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
 children: ReactNode;
 defaultVariant?: Variant;
 defaultMode?: ThemeMode;
 storageKey?: string;
}

/**
 * Theme provider component
 * Manages theme mode and variant state
 */
export function ThemeProvider({
 children,
 defaultVariant = "dev",
 defaultMode = "dark",
 storageKey = "profile-ui-theme",
}: ThemeProviderProps) {
 const [variant, setVariantState] = useState<Variant>(defaultVariant);
 const [mode, setModeState] = useState<ThemeMode>(defaultMode);

 // Load from storage on mount
 useEffect(() => {
  if (typeof window === "undefined") return;

  try {
   const stored = localStorage.getItem(storageKey);
   if (stored) {
    const { variant: storedVariant, mode: storedMode } = JSON.parse(stored);
    if (storedVariant) setVariantState(storedVariant);
    if (storedMode) setModeState(storedMode);
   }
  } catch {
   // Ignore storage errors
  }
 }, [storageKey]);

 // Apply theme classes to document
 useEffect(() => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  // Remove existing variant classes
  root.classList.remove(
   "variant-dev",
   "variant-product",
   "variant-design",
   "variant-data",
   "variant-devops"
  );
  root.classList.remove("dark", "light");

  // Add current classes
  root.classList.add(`variant-${variant}`);
  root.classList.add(mode);
 }, [variant, mode]);

 const setVariant = useCallback(
  (newVariant: Variant) => {
   setVariantState(newVariant);
   if (typeof window !== "undefined") {
    try {
     const stored = localStorage.getItem(storageKey);
     const data = stored ? JSON.parse(stored) : {};
     localStorage.setItem(
      storageKey,
      JSON.stringify({ ...data, variant: newVariant })
     );
    } catch {
     // Ignore storage errors
    }
   }
  },
  [storageKey]
 );

 const setMode = useCallback(
  (newMode: ThemeMode) => {
   setModeState(newMode);
   if (typeof window !== "undefined") {
    try {
     const stored = localStorage.getItem(storageKey);
     const data = stored ? JSON.parse(stored) : {};
     localStorage.setItem(
      storageKey,
      JSON.stringify({ ...data, mode: newMode })
     );
    } catch {
     // Ignore storage errors
    }
   }
  },
  [storageKey]
 );

 const toggleMode = useCallback(() => {
  setMode(mode === "dark" ? "light" : "dark");
 }, [mode, setMode]);

 const theme: Theme = {
  mode,
  variant,
  colors: getThemeColors(variant, mode),
 };

 const value: ThemeContextValue = {
  theme,
  variant,
  setVariant,
  mode,
  setMode,
  toggleMode,
 };

 return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to access theme context
 */
export function useTheme(): ThemeContextValue {
 const context = useContext(ThemeContext);

 if (!context) {
  // Return default values if used outside provider
  return {
   theme: defaultTheme,
   variant: "dev",
   setVariant: () => {},
   mode: "dark",
   setMode: () => {},
   toggleMode: () => {},
  };
 }

 return context;
}
