/**
 * Grid - Mobile Implementation
 *
 * @layer Infrastructure (Mobile)
 * @note React Native doesn't have CSS Grid, using flexWrap simulation
 */

import { View, type ViewStyle } from "react-native";
import type { ReactNode } from "react";
import type { GridMobileProps } from "./grid.types";

interface GridMobileImplProps extends GridMobileProps {
 style?: ViewStyle;
}

export function Grid({
 children,
 columns = 2,
 gap = 0,
 testID,
 style,
}: GridMobileImplProps) {
 const _numColumns = typeof columns === "number" ? columns : 2;
 const gapValue = typeof gap === "number" ? gap : 0;

 return (
  <View
   testID={testID}
   style={[
    {
     flexDirection: "row",
     flexWrap: "wrap",
     marginHorizontal: -gapValue / 2,
     marginVertical: -gapValue / 2,
    },
    style,
   ]}
  >
   {children}
  </View>
 );
}

interface GridItemMobileProps {
 children?: ReactNode;
 colSpan?: number;
 columns?: number;
 gap?: number;
 style?: ViewStyle;
 testID?: string;
}

export function GridItem({
 children,
 colSpan = 1,
 columns = 2,
 gap = 0,
 style,
 testID,
}: GridItemMobileProps) {
 const gapValue = typeof gap === "number" ? gap : 0;
 const width = `${(100 / columns) * colSpan}%`;

 return (
  <View
   testID={testID}
   style={[
    {
     width: width as unknown as number,
     paddingHorizontal: gapValue / 2,
     paddingVertical: gapValue / 2,
    },
    style,
   ]}
  >
   {children}
  </View>
 );
}
