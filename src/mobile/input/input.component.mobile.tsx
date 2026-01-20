/**
 * Input - Mobile Implementation
 * @layer Infrastructure (Mobile)
 */

import {
 View,
 TextInput,
 Text,
 StyleSheet,
 type TextInputProps as RNTextInputProps,
} from "react-native";
import { useInput, type InputProps, inputTokens } from "../../shared/input";

export interface MobileInputProps extends InputProps {
 textInputProps?: Omit<RNTextInputProps, keyof InputProps>;
}

export function Input({
 value,
 defaultValue,
 placeholder,
 leftAddon,
 rightAddon,
 helperText,
 disabled,
 readOnly,
 onChangeText,
 onFocus,
 onBlur,
 onSubmit,
 testID,
 accessibilityLabel,
 textInputProps,
 ...props
}: MobileInputProps) {
 const { errorMessage, sizeToken, stateToken } = useInput(props);

 return (
  <View style={styles.container}>
   <View style={styles.inputWrapper}>
    {leftAddon && <View style={styles.leftAddon}>{leftAddon}</View>}
    <TextInput
     value={value}
     defaultValue={defaultValue}
     placeholder={placeholder}
     placeholderTextColor={inputTokens.colors.placeholder}
     editable={!disabled && !readOnly}
     onChangeText={onChangeText}
     onFocus={onFocus}
     onBlur={onBlur}
     onSubmitEditing={onSubmit}
     testID={testID}
     accessibilityLabel={accessibilityLabel}
     style={[
      styles.input,
      {
       height: sizeToken.height,
       paddingHorizontal: sizeToken.paddingH,
       fontSize: sizeToken.fontSize,
       borderRadius: inputTokens.radius,
       backgroundColor: disabled
        ? inputTokens.colors.disabled.background
        : inputTokens.colors.background,
       color: disabled
        ? inputTokens.colors.disabled.text
        : inputTokens.colors.text,
       borderWidth: 1,
       borderColor: stateToken.border,
       paddingLeft: leftAddon ? 40 : sizeToken.paddingH,
       paddingRight: rightAddon ? 40 : sizeToken.paddingH,
      },
     ]}
     {...textInputProps}
    />
    {rightAddon && <View style={styles.rightAddon}>{rightAddon}</View>}
   </View>
   {(errorMessage || helperText) && (
    <Text
     style={[
      styles.helperText,
      { color: errorMessage ? "#ef4444" : inputTokens.colors.placeholder },
     ]}
    >
     {errorMessage || helperText}
    </Text>
   )}
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  width: "100%",
 },
 inputWrapper: {
  position: "relative",
 },
 input: {},
 leftAddon: {
  position: "absolute",
  left: 12,
  top: 0,
  bottom: 0,
  justifyContent: "center",
  zIndex: 1,
 },
 rightAddon: {
  position: "absolute",
  right: 12,
  top: 0,
  bottom: 0,
  justifyContent: "center",
  zIndex: 1,
 },
 helperText: {
  marginTop: 6,
  fontSize: 12,
 },
});
