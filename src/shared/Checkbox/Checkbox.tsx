import type { CheckboxProps } from "./Checkbox.types";
import { checkboxTokens } from "./Checkbox.types";

export function useCheckbox(props: CheckboxProps) {
 const { variant = "default", checked = false, disabled = false } = props;
 const variantToken = checkboxTokens.variants[variant];
 const stateToken = checked ? variantToken.checked : variantToken.unchecked;
 return { variantToken, stateToken, checked, disabled, variant };
}

export * from "./Checkbox.types";
