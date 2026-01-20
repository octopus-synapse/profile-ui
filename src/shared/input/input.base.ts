/**
 * Input - Base Component
 *
 * @layer Application
 */

import type { InputProps } from "./input.types";
import { inputTokens } from "./input.types";

export function useInput(props: InputProps) {
 const { inputSize = "md", state = "default", error, disabled = false } = props;

 const hasError = Boolean(error) || state === "error";
 const errorMessage = typeof error === "string" ? error : undefined;
 const sizeToken = inputTokens.sizes[inputSize];
 const stateToken = inputTokens.states[hasError ? "error" : state];

 return {
  hasError,
  errorMessage,
  sizeToken,
  stateToken,
  disabled,
  inputSize,
  state,
 };
}

export * from "./input.types";
