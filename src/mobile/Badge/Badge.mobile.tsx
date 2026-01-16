/**
 * Badge - Mobile Implementation
 * @layer Infrastructure (Mobile)
 */

import { View, Text, Pressable, StyleSheet } from "react-native";
import { useBadge, type BadgeProps, badgeTokens } from "../../shared/Badge";

export interface MobileBadgeProps extends BadgeProps {}

export function Badge({
 children,
 onRemove,
 testID,
 ...props
}: MobileBadgeProps) {
 const { variantToken, sizeToken, shapeToken, dot, removable } = useBadge({
  ...props,
  children,
 });

 return (
  <View
   testID={testID}
   style={[
    styles.base,
    {
     paddingHorizontal: sizeToken.paddingH,
     paddingVertical: sizeToken.paddingV,
     borderRadius: shapeToken.radius,
     backgroundColor: variantToken.background,
     ...(variantToken.border !== "transparent" && {
      borderWidth: 1,
      borderColor: variantToken.border,
     }),
    },
   ]}
  >
   {dot && (
    <View
     style={[
      styles.dot,
      {
       width: badgeTokens.dot.size,
       height: badgeTokens.dot.size,
       marginRight: badgeTokens.dot.gap,
       backgroundColor: variantToken.text,
      },
     ]}
    />
   )}
   <Text
    style={[
     styles.text,
     { fontSize: sizeToken.fontSize, color: variantToken.text },
    ]}
   >
    {children}
   </Text>
   {removable && (
    <Pressable onPress={onRemove} style={styles.removeButton} hitSlop={8}>
     <Text style={[styles.removeIcon, { color: variantToken.text }]}>×</Text>
    </Pressable>
   )}
  </View>
 );
}

const styles = StyleSheet.create({
 base: {
  flexDirection: "row",
  alignItems: "center",
 },
 dot: {
  borderRadius: 999,
 },
 text: {
  fontWeight: "500",
 },
 removeButton: {
  marginLeft: 4,
 },
 removeIcon: {
  fontSize: 14,
  fontWeight: "600",
 },
});
