/**
 * Checkbox - Mobile Implementation
 * @layer Infrastructure (Mobile)
 */

import { View, Text, Pressable } from "react-native";
import {
 useCheckbox,
 checkboxTokens,
 type CheckboxWithLabelProps,
} from "../../shared/checkbox";

export function Checkbox({
 label,
 description,
 error,
 onCheckedChange,
 testID,
 accessibilityLabel,
 ...props
}: CheckboxWithLabelProps) {
 const { stateToken, checked, disabled } = useCheckbox(props);

 return (
  <Pressable
   onPress={() => onCheckedChange?.(!checked)}
   disabled={disabled}
   testID={testID}
   accessibilityLabel={accessibilityLabel}
   accessibilityRole="checkbox"
   accessibilityState={{ checked, disabled }}
   style={{
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    opacity: disabled ? 0.5 : 1,
   }}
  >
   <View
    style={{
     width: checkboxTokens.size,
     height: checkboxTokens.size,
     borderRadius: checkboxTokens.radius,
     borderWidth: 2,
     borderColor: stateToken.border,
     backgroundColor: stateToken.background,
     alignItems: "center",
     justifyContent: "center",
    }}
   >
    {checked && (
     <Text
      style={{
       color:
        "check" in stateToken
         ? (stateToken as { check: string }).check
         : "#fff",
       fontSize: 10,
       fontWeight: "bold",
      }}
     >
      ✓
     </Text>
    )}
   </View>
   <View style={{ flex: 1 }}>
    {label && (
     <Text style={{ color: checkboxTokens.colors.label, fontSize: 14 }}>
      {label}
     </Text>
    )}
    {description && (
     <Text
      style={{
       color: checkboxTokens.colors.description,
       fontSize: 12,
       marginTop: 2,
      }}
     >
      {description}
     </Text>
    )}
    {error && (
     <Text
      style={{ color: checkboxTokens.colors.error, fontSize: 12, marginTop: 2 }}
     >
      {error}
     </Text>
    )}
   </View>
  </Pressable>
 );
}
