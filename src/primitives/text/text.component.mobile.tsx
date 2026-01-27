

import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { buildTextStylesMobile, type TextMobileProps } from "./text.types";

export function Text({
 children,
 style,
 testID,
 numberOfLines,
 selectable = false,
 ...props
}: TextMobileProps & Omit<RNTextProps, keyof TextMobileProps>) {
 const textStyles = buildTextStylesMobile({ ...props, numberOfLines });

 return (
  <RNText
   testID={testID}
   style={[textStyles, style]}
   numberOfLines={numberOfLines}
   selectable={selectable}
  >
   {children}
  </RNText>
 );
}


export function Heading({
 level = 2,
 size,
 weight = "bold",
 ...props
}: TextMobileProps & { level?: 1 | 2 | 3 | 4 | 5 | 6 }) {
 const defaultSizes: Record<number, TextMobileProps["size"]> = {
  1: "4xl",
  2: "3xl",
  3: "2xl",
  4: "xl",
  5: "lg",
  6: "md",
 };
 return <Text size={size ?? defaultSizes[level]} weight={weight} {...props} />;
}
