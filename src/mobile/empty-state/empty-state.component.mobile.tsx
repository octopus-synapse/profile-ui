

import { View, Text, StyleSheet } from "react-native";
import {
 useEmptyState,
 type EmptyStateProps,
 emptyStateTokens,
} from "../../shared/empty-state";

export function EmptyState({
 icon,
 title,
 description,
 action,
 testID,
 ...props
}: EmptyStateProps) {
 const { sizeToken } = useEmptyState({ ...props, title });

 return (
  <View
   testID={testID}
   style={[styles.container, { padding: sizeToken.padding }]}
  >
   {icon && <View style={{ marginBottom: 16 }}>{icon}</View>}
   <Text style={[styles.title, { fontSize: sizeToken.titleSize }]}>
    {title}
   </Text>
   {description && (
    <Text style={[styles.description, { fontSize: sizeToken.descSize }]}>
     {description}
    </Text>
   )}
   {action && <View style={styles.action}>{action}</View>}
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  alignItems: "center",
  justifyContent: "center",
 },
 title: {
  color: emptyStateTokens.colors.title,
  fontWeight: "600",
  textAlign: "center",
  marginBottom: 8,
 },
 description: {
  color: emptyStateTokens.colors.description,
  textAlign: "center",
  maxWidth: 320,
 },
 action: {
  marginTop: 24,
 },
});
