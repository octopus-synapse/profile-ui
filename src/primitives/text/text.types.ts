

import type { ReactNode, CSSProperties } from "react";
import type { TextStyle } from "react-native";

export type TextVariant =
 | "body"
 | "caption"
 | "label"
 | "heading"
 | "display"
 | "code";
export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";
export type TextAlign = "left" | "center" | "right" | "justify";
export type TextAs =
 | "p"
 | "span"
 | "h1"
 | "h2"
 | "h3"
 | "h4"
 | "h5"
 | "h6"
 | "label"
 | "code"
 | "pre"
 | "a"
 | "strong"
 | "em"
 | "blockquote";

export interface TextBaseProps {
 children?: ReactNode;
 variant?: TextVariant;
 size?: TextSize;
 weight?: TextWeight;
 align?: TextAlign;
 color?: string;
 lineHeight?: number | string;
 letterSpacing?: number | string;
 truncate?: boolean;
 numberOfLines?: number;
 testID?: string;
}

export interface TextWebProps extends TextBaseProps {
 as?: TextAs;
 className?: string;
 style?: CSSProperties;
 htmlFor?: string;
 href?: string;
 target?: string;
 rel?: string;
}

export interface TextMobileProps extends TextBaseProps {
 style?: TextStyle;
 selectable?: boolean;
}





export const textTokens = {
 sizes: {
  xs: { fontSize: 12, lineHeight: 16 },
  sm: { fontSize: 14, lineHeight: 20 },
  md: { fontSize: 16, lineHeight: 24 },
  lg: { fontSize: 18, lineHeight: 28 },
  xl: { fontSize: 20, lineHeight: 28 },
  "2xl": { fontSize: 24, lineHeight: 32 },
  "3xl": { fontSize: 30, lineHeight: 36 },
  "4xl": { fontSize: 36, lineHeight: 40 },
 },
 weights: {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
 },
} as const;

export function buildTextStyles(props: TextBaseProps): CSSProperties {
 const {
  size = "md",
  weight = "normal",
  align,
  color,
  lineHeight,
  letterSpacing,
  truncate,
  numberOfLines,
 } = props;

 const sizeToken = textTokens.sizes[size];
 const weightValue = textTokens.weights[weight];

 return {
  fontSize: sizeToken.fontSize,
  lineHeight: lineHeight ?? sizeToken.lineHeight,
  fontWeight: weightValue,
  textAlign: align,
  color,
  letterSpacing,
  ...(truncate && {
   overflow: "hidden",
   textOverflow: "ellipsis",
   whiteSpace: "nowrap",
  }),
  ...(numberOfLines &&
   numberOfLines > 1 && {
    display: "-webkit-box",
    WebkitLineClamp: numberOfLines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
   }),
 } as CSSProperties;
}

export function buildTextStylesMobile(props: TextBaseProps): TextStyle {
 const {
  size = "md",
  weight = "normal",
  align,
  color,
  lineHeight,
  letterSpacing,
 } = props;

 const sizeToken = textTokens.sizes[size];
 const weightValue = textTokens.weights[weight];

 return {
  fontSize: sizeToken.fontSize,
  lineHeight:
   typeof lineHeight === "number"
    ? lineHeight
    : lineHeight
      ? undefined
      : sizeToken.lineHeight,
  fontWeight: String(weightValue) as TextStyle["fontWeight"],
  textAlign: align,
  color,
  letterSpacing: typeof letterSpacing === "number" ? letterSpacing : undefined,
 };
}
