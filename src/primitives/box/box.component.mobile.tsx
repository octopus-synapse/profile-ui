

import { View, type ViewProps } from "react-native";
import { buildBoxStyles, type BoxMobileProps } from "./box.types";

export function Box({ children, style, testID, ...props }: BoxMobileProps & ViewProps) {
  const boxStyles = buildBoxStyles(props);

  return (
    <View testID={testID} style={[boxStyles, style]}>
      {children}
    </View>
  );
}
