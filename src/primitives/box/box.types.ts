

import type { ReactNode, CSSProperties } from "react";
import type { ViewStyle } from "react-native";





export type BoxAs =
 | "div"
 | "span"
 | "section"
 | "article"
 | "main"
 | "aside"
 | "header"
 | "footer"
 | "nav"
 | "ul"
 | "ol"
 | "li";

export interface BoxBaseProps {
 children?: ReactNode;
 testID?: string;

 
 display?: "flex" | "block" | "inline" | "inline-flex" | "none";
 flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
 alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
 justifyContent?:
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
 flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
 flex?: number;
 gap?: number | string;

 
 padding?: number | string;
 paddingX?: number | string;
 paddingY?: number | string;
 paddingTop?: number | string;
 paddingBottom?: number | string;
 paddingLeft?: number | string;
 paddingRight?: number | string;
 margin?: number | string;
 marginX?: number | string;
 marginY?: number | string;
 marginTop?: number | string;
 marginBottom?: number | string;
 marginLeft?: number | string;
 marginRight?: number | string;

 
 width?: number | string;
 height?: number | string;
 minWidth?: number | string;
 minHeight?: number | string;
 maxWidth?: number | string;
 maxHeight?: number | string;

 
 backgroundColor?: string;
 borderRadius?: number | string;
 borderWidth?: number;
 borderColor?: string;
 opacity?: number;

 
 position?: "relative" | "absolute" | "fixed" | "sticky";
 top?: number | string;
 right?: number | string;
 bottom?: number | string;
 left?: number | string;
 zIndex?: number;

 
 overflow?: "visible" | "hidden" | "scroll" | "auto";
 overflowX?: "visible" | "hidden" | "scroll" | "auto";
 overflowY?: "visible" | "hidden" | "scroll" | "auto";
}

export interface BoxWebProps extends BoxBaseProps {
 as?: BoxAs;
 className?: string;
 style?: CSSProperties;
 onClick?: () => void;
 onMouseEnter?: () => void;
 onMouseLeave?: () => void;
}

export interface BoxMobileProps extends BoxBaseProps {
 style?: ViewStyle;
 onPress?: () => void;
}





export function buildBoxStyles(props: BoxBaseProps): Record<string, unknown> {
 return {
  display: props.display,
  flexDirection: props.flexDirection,
  alignItems: props.alignItems,
  justifyContent: props.justifyContent,
  flexWrap: props.flexWrap,
  flex: props.flex,
  gap: props.gap,
  padding: props.padding,
  paddingTop: props.paddingTop ?? props.paddingY,
  paddingBottom: props.paddingBottom ?? props.paddingY,
  paddingLeft: props.paddingLeft ?? props.paddingX,
  paddingRight: props.paddingRight ?? props.paddingX,
  margin: props.margin,
  marginTop: props.marginTop ?? props.marginY,
  marginBottom: props.marginBottom ?? props.marginY,
  marginLeft: props.marginLeft ?? props.marginX,
  marginRight: props.marginRight ?? props.marginX,
  width: props.width,
  height: props.height,
  minWidth: props.minWidth,
  minHeight: props.minHeight,
  maxWidth: props.maxWidth,
  maxHeight: props.maxHeight,
  backgroundColor: props.backgroundColor,
  borderRadius: props.borderRadius,
  borderWidth: props.borderWidth,
  borderColor: props.borderColor,
  opacity: props.opacity,
  position: props.position,
  top: props.top,
  right: props.right,
  bottom: props.bottom,
  left: props.left,
  zIndex: props.zIndex,
  overflow: props.overflow,
  overflowX: props.overflowX,
  overflowY: props.overflowY,
 };
}
