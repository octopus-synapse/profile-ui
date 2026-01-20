/**
 * Style Props Parser
 *
 * @principle Single Responsibility
 * @layer Application
 *
 * Converts style props to CSS-in-JS objects (web) or React Native styles.
 * Similar to Chakra UI's styled-system parser.
 */

import type { StyleProps, PseudoProps } from "./style-props.types";
import type { CSSProperties } from "react";

// =============================================================================
// Type Guards
// =============================================================================

function isNumber(value: unknown): value is number {
 return typeof value === "number";
}

function toPx(value: string | number | undefined): string | number | undefined {
 if (value === undefined) return undefined;
 return isNumber(value) ? `${value}px` : value;
}

// =============================================================================
// Style Prop Parsers
// =============================================================================

export function parseLayoutProps(props: StyleProps): Partial<CSSProperties> {
 return {
  display: props.display,
  width: toPx(props.width ?? props.w),
  height: toPx(props.height ?? props.h),
  minWidth: toPx(props.minWidth ?? props.minW),
  maxWidth: toPx(props.maxWidth ?? props.maxW),
  minHeight: toPx(props.minHeight ?? props.minH),
  maxHeight: toPx(props.maxHeight ?? props.maxH),
  overflow: props.overflow,
  overflowX: props.overflowX,
  overflowY: props.overflowY,
 };
}

export function parseFlexboxProps(props: StyleProps): Partial<CSSProperties> {
 return {
  alignItems: props.alignItems,
  alignContent: props.alignContent,
  justifyItems: props.justifyItems,
  justifyContent: props.justifyContent,
  flexWrap: props.flexWrap,
  flexDirection: props.flexDirection,
  flex: props.flex,
  flexGrow: props.flexGrow,
  flexShrink: props.flexShrink,
  flexBasis: props.flexBasis,
  justifySelf: props.justifySelf,
  alignSelf: props.alignSelf,
  order: props.order,
 };
}

export function parseGridProps(props: StyleProps): Partial<CSSProperties> {
 return {
  gridGap: toPx(props.gridGap),
  gridRowGap: toPx(props.gridRowGap),
  gridColumnGap: toPx(props.gridColumnGap),
  gridColumn: props.gridColumn,
  gridRow: props.gridRow,
  gridArea: props.gridArea,
  gridAutoFlow: props.gridAutoFlow,
  gridAutoRows: props.gridAutoRows,
  gridAutoColumns: props.gridAutoColumns,
  gridTemplateRows: props.gridTemplateRows,
  gridTemplateColumns: props.gridTemplateColumns,
  gridTemplateAreas: props.gridTemplateAreas,
 };
}

export function parseSpacingProps(props: StyleProps): Partial<CSSProperties> {
 const marginX = toPx(props.marginX ?? props.mx);
 const marginY = toPx(props.marginY ?? props.my);
 const paddingX = toPx(props.paddingX ?? props.px);
 const paddingY = toPx(props.paddingY ?? props.py);

 return {
  margin: toPx(props.margin ?? props.m),
  marginTop: toPx(props.marginTop ?? props.mt ?? marginY),
  marginRight: toPx(props.marginRight ?? props.mr ?? marginX),
  marginBottom: toPx(props.marginBottom ?? props.mb ?? marginY),
  marginLeft: toPx(props.marginLeft ?? props.ml ?? marginX),
  padding: toPx(props.padding ?? props.p),
  paddingTop: toPx(props.paddingTop ?? props.pt ?? paddingY),
  paddingRight: toPx(props.paddingRight ?? props.pr ?? paddingX),
  paddingBottom: toPx(props.paddingBottom ?? props.pb ?? paddingY),
  paddingLeft: toPx(props.paddingLeft ?? props.pl ?? paddingX),
 };
}

export function parseColorProps(props: StyleProps): Partial<CSSProperties> {
 return {
  color: props.color,
  backgroundColor: props.backgroundColor ?? props.bg,
  opacity: props.opacity,
  background: props.background,
 };
}

export function parseTypographyProps(
 props: StyleProps,
): Partial<CSSProperties> {
 return {
  fontFamily: props.fontFamily,
  fontSize: toPx(props.fontSize),
  fontWeight: props.fontWeight,
  lineHeight: props.lineHeight,
  letterSpacing: props.letterSpacing,
  textAlign: props.textAlign,
  fontStyle: props.fontStyle,
  textTransform: props.textTransform,
  textDecoration: props.textDecoration,
  whiteSpace: props.whiteSpace,
  textOverflow: props.textOverflow,
  wordBreak: props.wordBreak,
 };
}

export function parseBorderProps(props: StyleProps): Partial<CSSProperties> {
 return {
  border: props.border,
  borderWidth: toPx(props.borderWidth),
  borderStyle: props.borderStyle,
  borderColor: props.borderColor,
  borderRadius: toPx(props.borderRadius),
  borderTop: props.borderTop,
  borderTopWidth: toPx(props.borderTopWidth),
  borderTopStyle: props.borderTopStyle,
  borderTopColor: props.borderTopColor,
  borderTopLeftRadius: toPx(props.borderTopLeftRadius),
  borderTopRightRadius: toPx(props.borderTopRightRadius),
  borderRight: props.borderRight,
  borderRightWidth: toPx(props.borderRightWidth),
  borderRightStyle: props.borderRightStyle,
  borderRightColor: props.borderRightColor,
  borderBottom: props.borderBottom,
  borderBottomWidth: toPx(props.borderBottomWidth),
  borderBottomStyle: props.borderBottomStyle,
  borderBottomColor: props.borderBottomColor,
  borderBottomLeftRadius: toPx(props.borderBottomLeftRadius),
  borderBottomRightRadius: toPx(props.borderBottomRightRadius),
  borderLeft: props.borderLeft,
  borderLeftWidth: toPx(props.borderLeftWidth),
  borderLeftStyle: props.borderLeftStyle,
  borderLeftColor: props.borderLeftColor,
 };
}

export function parsePositionProps(props: StyleProps): Partial<CSSProperties> {
 return {
  position: props.position,
  zIndex: props.zIndex,
  top: toPx(props.top),
  right: toPx(props.right),
  bottom: toPx(props.bottom),
  left: toPx(props.left),
  inset: toPx(props.inset),
 };
}

export function parseShadowProps(props: StyleProps): Partial<CSSProperties> {
 return {
  boxShadow: props.boxShadow,
  textShadow: props.textShadow,
 };
}

// =============================================================================
// Main Parser
// =============================================================================

export function parseStyleProps(props: StyleProps): Partial<CSSProperties> {
 return {
  ...parseLayoutProps(props),
  ...parseFlexboxProps(props),
  ...parseGridProps(props),
  ...parseSpacingProps(props),
  ...parseColorProps(props),
  ...parseTypographyProps(props),
  ...parseBorderProps(props),
  ...parsePositionProps(props),
  ...parseShadowProps(props),
 };
}

// =============================================================================
// Pseudo State Parser
// =============================================================================

export function parsePseudoProps(
 pseudoProps: PseudoProps,
): Record<string, Partial<CSSProperties>> {
 const result: Record<string, Partial<CSSProperties>> = {};

 if (pseudoProps._hover) {
  result["&:hover"] = parseStyleProps(pseudoProps._hover);
 }
 if (pseudoProps._active) {
  result["&:active"] = parseStyleProps(pseudoProps._active);
 }
 if (pseudoProps._focus) {
  result["&:focus"] = parseStyleProps(pseudoProps._focus);
 }
 if (pseudoProps._disabled) {
  result["&:disabled"] = parseStyleProps(pseudoProps._disabled);
 }
 if (pseudoProps._selected) {
  result["&[aria-selected=true]"] = parseStyleProps(pseudoProps._selected);
 }
 if (pseudoProps._invalid) {
  result["&[aria-invalid=true]"] = parseStyleProps(pseudoProps._invalid);
 }
 if (pseudoProps._checked) {
  result["&:checked"] = parseStyleProps(pseudoProps._checked);
 }

 return result;
}

// =============================================================================
// Filter Style Props
// =============================================================================

const STYLE_PROP_KEYS = new Set([
 // Layout
 "display",
 "width",
 "w",
 "height",
 "h",
 "minWidth",
 "minW",
 "maxWidth",
 "maxW",
 "minHeight",
 "minH",
 "maxHeight",
 "maxH",
 "overflow",
 "overflowX",
 "overflowY",
 // Flexbox
 "alignItems",
 "alignContent",
 "justifyItems",
 "justifyContent",
 "flexWrap",
 "flexDirection",
 "flex",
 "flexGrow",
 "flexShrink",
 "flexBasis",
 "justifySelf",
 "alignSelf",
 "order",
 // Grid
 "gridGap",
 "gridRowGap",
 "gridColumnGap",
 "gridColumn",
 "gridRow",
 "gridArea",
 "gridAutoFlow",
 "gridAutoRows",
 "gridAutoColumns",
 "gridTemplateRows",
 "gridTemplateColumns",
 "gridTemplateAreas",
 // Spacing
 "margin",
 "m",
 "marginTop",
 "mt",
 "marginRight",
 "mr",
 "marginBottom",
 "mb",
 "marginLeft",
 "ml",
 "marginX",
 "mx",
 "marginY",
 "my",
 "padding",
 "p",
 "paddingTop",
 "pt",
 "paddingRight",
 "pr",
 "paddingBottom",
 "pb",
 "paddingLeft",
 "pl",
 "paddingX",
 "px",
 "paddingY",
 "py",
 // Color
 "color",
 "backgroundColor",
 "bg",
 "opacity",
 "background",
 // Typography
 "fontFamily",
 "fontSize",
 "fontWeight",
 "lineHeight",
 "letterSpacing",
 "textAlign",
 "fontStyle",
 "textTransform",
 "textDecoration",
 "whiteSpace",
 "textOverflow",
 "wordBreak",
 // Border
 "border",
 "borderWidth",
 "borderStyle",
 "borderColor",
 "borderRadius",
 "borderTop",
 "borderTopWidth",
 "borderTopStyle",
 "borderTopColor",
 "borderTopLeftRadius",
 "borderTopRightRadius",
 "borderRight",
 "borderRightWidth",
 "borderRightStyle",
 "borderRightColor",
 "borderBottom",
 "borderBottomWidth",
 "borderBottomStyle",
 "borderBottomColor",
 "borderBottomLeftRadius",
 "borderBottomRightRadius",
 "borderLeft",
 "borderLeftWidth",
 "borderLeftStyle",
 "borderLeftColor",
 "borderX",
 "borderY",
 // Position
 "position",
 "zIndex",
 "top",
 "right",
 "bottom",
 "left",
 "inset",
 // Shadow
 "boxShadow",
 "textShadow",
 // Pseudo
 "_hover",
 "_active",
 "_focus",
 "_disabled",
 "_selected",
 "_invalid",
 "_checked",
]);

export function omitStyleProps<T extends Record<string, unknown>>(
 props: T,
): Omit<T, keyof StyleProps | keyof PseudoProps> {
 const result: Record<string, unknown> = {};

 for (const key in props) {
  if (!STYLE_PROP_KEYS.has(key)) {
   result[key] = props[key];
  }
 }

 return result as Omit<T, keyof StyleProps | keyof PseudoProps>;
}
