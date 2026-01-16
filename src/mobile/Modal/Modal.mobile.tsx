/**
 * Modal - Mobile Implementation
 * @layer Infrastructure (Mobile)
 */

import {
 View,
 Text,
 Pressable,
 Modal as RNModal,
 StyleSheet,
} from "react-native";
import {
 useModal,
 type ModalProps,
 type ModalHeaderProps,
 type ModalFooterProps,
 modalTokens,
} from "../../shared/Modal";

// ─── Modal Root ──────────────────────────────────────────────────────────────

export function Modal({ children, testID, onClose, ...props }: ModalProps) {
 const { open, sizeToken, closeOnOverlayClick } = useModal({
  ...props,
  onClose,
  children,
 });

 return (
  <RNModal
   visible={open}
   transparent
   animationType="fade"
   onRequestClose={onClose}
  >
   <Pressable
    testID={testID}
    style={styles.overlay}
    onPress={closeOnOverlayClick ? onClose : undefined}
   >
    <Pressable
     style={[
      styles.content,
      {
       maxWidth:
        typeof sizeToken.maxWidth === "number" ? sizeToken.maxWidth : undefined,
       padding: sizeToken.padding,
      },
     ]}
     onPress={(e) => e.stopPropagation()}
    >
     {children}
    </Pressable>
   </Pressable>
  </RNModal>
 );
}

// ─── Modal Header ────────────────────────────────────────────────────────────

export function ModalHeader({ children }: ModalHeaderProps) {
 return (
  <View style={styles.header}>
   <Text style={styles.title}>{children}</Text>
  </View>
 );
}

// ─── Modal Footer ────────────────────────────────────────────────────────────

export function ModalFooter({ children }: ModalFooterProps) {
 return <View style={styles.footer}>{children}</View>;
}

const styles = StyleSheet.create({
 overlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: modalTokens.overlay.background,
 },
 content: {
  width: "90%",
  backgroundColor: modalTokens.content.background,
  borderRadius: modalTokens.content.radius,
  borderWidth: 1,
  borderColor: modalTokens.content.border,
 },
 header: {
  marginBottom: 16,
 },
 title: {
  fontSize: modalTokens.title.fontSize,
  color: modalTokens.title.color,
  fontWeight: "600",
 },
 footer: {
  marginTop: 24,
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: 12,
 },
});
