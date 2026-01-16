/**
 * Separator - Mobile Implementation
 * @layer Infrastructure (Mobile)
 */

import { View } from "react-native";
import { useSeparator, type SeparatorProps } from "../../shared/Separator";

export interface MobileSeparatorProps extends SeparatorProps {}

export function Separator({ testID, ...props }: MobileSeparatorProps) {
 const { orientation, decorative, color, thickness } = useSeparator(props);
 const isHorizontal = orientation === "horizontal";

 return (
  <View
   testID={testID}
   accessibilityRole={decorative ? "none" : ("separator" as any)}
   style={{
    width: isHorizontal ? "100%" : thickness,
    height: isHorizontal ? thickness : "100%",
    backgroundColor: color,
   }}
  />
 );
}
