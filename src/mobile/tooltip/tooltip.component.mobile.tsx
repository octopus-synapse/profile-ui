

import { useState, useRef, type ReactNode } from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { type TooltipProps, tooltipTokens } from "../../shared/tooltip";

export function Tooltip({
 content,
 children,
 delay = 200,
 disabled = false,
 testID,
}: TooltipProps) {
 const [visible, setVisible] = useState(false);
 const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

 const show = () => {
  if (disabled) return;
  timeoutRef.current = setTimeout(() => setVisible(true), delay);
 };

 const hide = () => {
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  setVisible(false);
 };

 if (!content) return <>{children}</>;

 return (
  <View testID={testID}>
   <Pressable onPressIn={show} onPressOut={hide}>
    {children as ReactNode}
   </Pressable>
   <Modal visible={visible} transparent animationType="fade">
    <Pressable style={styles.overlay} onPress={hide}>
     <View style={styles.tooltip}>
      <Text style={styles.text}>{content as ReactNode}</Text>
     </View>
    </Pressable>
   </Modal>
  </View>
 );
}

const styles = StyleSheet.create({
 overlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
 },
 tooltip: {
  backgroundColor: tooltipTokens.background,
  paddingHorizontal: tooltipTokens.padding.h,
  paddingVertical: tooltipTokens.padding.v,
  borderRadius: tooltipTokens.radius,
  borderWidth: 1,
  borderColor: tooltipTokens.border,
 },
 text: {
  color: tooltipTokens.text,
  fontSize: tooltipTokens.fontSize,
 },
});
