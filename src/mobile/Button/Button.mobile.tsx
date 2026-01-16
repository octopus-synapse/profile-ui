/**
 * Button - Mobile Implementation
 * @layer Infrastructure (Mobile)
 */

import {
 View,
 Text,
 Pressable,
 ActivityIndicator,
 StyleSheet,
} from "react-native";
import { useButton, type ButtonProps } from "../../shared/Button";

export interface MobileButtonProps extends ButtonProps {}

export function Button({
 children,
 leftIcon,
 rightIcon,
 onPress,
 testID,
 ...props
}: MobileButtonProps) {
 const { isDisabled, variantToken, sizeToken, fullWidth, loading } = useButton({
  ...props,
  children,
 });

 return (
  <Pressable
   onPress={onPress}
   disabled={isDisabled}
   testID={testID}
   style={({ pressed }) => [
    styles.base,
    fullWidth && styles.fullWidth,
    {
     height: sizeToken.height,
     paddingHorizontal: sizeToken.paddingH,
     borderRadius: sizeToken.radius,
     backgroundColor: variantToken.background,
     borderWidth: 1,
     borderColor: variantToken.border,
     opacity: isDisabled ? 0.5 : pressed ? 0.9 : 1,
     transform: [{ scale: pressed ? 0.98 : 1 }],
    },
   ]}
  >
   {loading ? (
    <ActivityIndicator size="small" color={variantToken.text} />
   ) : (
    <View style={styles.content}>
     {leftIcon}
     <Text
      style={[
       styles.text,
       { color: variantToken.text, fontSize: sizeToken.fontSize },
      ]}
     >
      {children}
     </Text>
     {rightIcon}
    </View>
   )}
  </Pressable>
 );
}

const styles = StyleSheet.create({
 base: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
 },
 fullWidth: {
  width: "100%",
 },
 content: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
 },
 text: {
  fontWeight: "600",
 },
});
