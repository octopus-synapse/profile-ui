/**
 * LoadingState - Mobile Implementation
 * @layer Infrastructure (Mobile)
 */

import { View, Text, StyleSheet, Modal } from "react-native";
import {
 useLoadingState,
 type LoadingStateProps,
 loadingStateTokens,
} from "../../shared/LoadingState";
import { Spinner } from "../Spinner/Spinner.mobile";

export function LoadingState({ message, testID, ...props }: LoadingStateProps) {
 const { size, minHeight, overlay } = useLoadingState(props);
 const numericMinHeight =
  typeof minHeight === "string" ? parseInt(minHeight, 10) : minHeight;

 const content = (
  <View
   testID={testID}
   style={[styles.container, { minHeight: numericMinHeight }]}
  >
   <Spinner size={size} />
   {message && <Text style={styles.message}>{message}</Text>}
  </View>
 );

 if (overlay) {
  return (
   <Modal visible transparent>
    <View style={styles.overlay}>{content}</View>
   </Modal>
  );
 }

 return content;
}

const styles = StyleSheet.create({
 container: {
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
 },
 message: {
  fontSize: loadingStateTokens.message.fontSize,
  color: loadingStateTokens.message.color,
 },
 overlay: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: loadingStateTokens.overlay.background,
 },
});
