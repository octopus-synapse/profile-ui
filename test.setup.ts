import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { mock } from "bun:test";

GlobalRegistrator.register();

// Mock react-native for tests
// This prevents errors when mobile components are imported during tests
mock.module("react-native", () => ({
  View: "div",
  Text: "span",
  TextInput: "input",
  Pressable: "button",
  Modal: "div",
  ActivityIndicator: "div",
  StyleSheet: {
    create: (styles: Record<string, any>) => styles,
  },
}));
