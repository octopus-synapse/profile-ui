/**
 * Spinner - Mobile Implementation
 * @layer Infrastructure (Mobile)
 */

import { ActivityIndicator, View } from "react-native";
import { useSpinner, type SpinnerProps } from "../../shared/Spinner";

export interface MobileSpinnerProps extends SpinnerProps {}

export function Spinner({ label, testID, ...props }: MobileSpinnerProps) {
 const { dimension, color } = useSpinner(props);

 return (
  <View
   testID={testID}
   accessibilityLabel={label ?? "Loading..."}
   accessibilityRole="progressbar"
  >
   <ActivityIndicator size={dimension > 28 ? "large" : "small"} color={color} />
  </View>
 );
}
