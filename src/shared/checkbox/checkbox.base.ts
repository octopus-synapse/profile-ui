import type { CheckboxProps } from "./checkbox.types";
import { checkboxTokens } from "./checkbox.types";

export function useCheckbox(props: CheckboxProps) {
 const { variant = "default", checked = false, disabled = false } = props;
 const variantToken = checkboxTokens.variants[variant];
 const stateToken = checked ? variantToken.checked : variantToken.unchecked;
 return { variantToken, stateToken, checked, disabled, variant };
}

export * from "./checkbox.types";
