/**
 * Card - Mobile Implementation
 * @layer Infrastructure (Mobile)
 */

import {
 View,
 Text,
 Pressable,
 StyleSheet,
 type ViewProps,
} from "react-native";
import {
 useCard,
 type CardProps,
 type CardHeaderProps,
 type CardTitleProps,
 type CardDescriptionProps,
 type CardContentProps,
 type CardFooterProps,
 cardTokens,
} from "../../shared/Card";

export interface MobileCardProps extends CardProps {}

export function Card({ children, onPress, testID, ...props }: MobileCardProps) {
 const { paddingValue, variantToken, interactive } = useCard({
  ...props,
  children,
 });

 const cardContent = (
  <View
   testID={testID}
   style={[
    styles.base,
    {
     padding: paddingValue,
     borderRadius: cardTokens.radius,
     backgroundColor: variantToken.background,
     borderWidth: 1,
     borderColor: variantToken.border,
    },
   ]}
  >
   {children}
  </View>
 );

 if (interactive || onPress) {
  return (
   <Pressable
    onPress={onPress}
    style={({ pressed }: { pressed: boolean }) => [
     { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] },
    ]}
   >
    {cardContent}
   </Pressable>
  );
 }

 return cardContent;
}

export function CardHeader({
 children,
 style,
}: CardHeaderProps & { style?: ViewProps["style"] }) {
 return <View style={[styles.header, style]}>{children}</View>;
}

export function CardTitle({
 children,
 style,
}: CardTitleProps & { style?: ViewProps["style"] }) {
 return <Text style={[styles.title, style]}>{children}</Text>;
}

export function CardDescription({
 children,
 style,
}: CardDescriptionProps & { style?: ViewProps["style"] }) {
 return <Text style={[styles.description, style]}>{children}</Text>;
}

export function CardContent({
 children,
 style,
}: CardContentProps & { style?: ViewProps["style"] }) {
 return <View style={[styles.content, style]}>{children}</View>;
}

export function CardFooter({
 children,
 style,
}: CardFooterProps & { style?: ViewProps["style"] }) {
 return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
 base: {},
 header: {
  gap: 6,
 },
 title: {
  fontSize: 20,
  fontWeight: "600",
  color: "#ffffff",
 },
 description: {
  fontSize: 14,
  color: "#a3a3a3",
 },
 content: {
  paddingTop: 16,
 },
 footer: {
  flexDirection: "row",
  alignItems: "center",
  paddingTop: 16,
  gap: 8,
 },
});
