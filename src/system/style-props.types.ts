

import type { Property } from "csstype";





export interface LayoutProps {
 
 display?: Property.Display;

 
 width?: Property.Width | number;
 w?: Property.Width | number; 
 height?: Property.Height | number;
 h?: Property.Height | number; 
 minWidth?: Property.MinWidth | number;
 minW?: Property.MinWidth | number;
 maxWidth?: Property.MaxWidth | number;
 maxW?: Property.MaxWidth | number;
 minHeight?: Property.MinHeight | number;
 minH?: Property.MinHeight | number;
 maxHeight?: Property.MaxHeight | number;
 maxH?: Property.MaxHeight | number;

 
 overflow?: Property.Overflow;
 overflowX?: Property.OverflowX;
 overflowY?: Property.OverflowY;
}





export interface FlexboxProps {
 alignItems?: Property.AlignItems;
 alignContent?: Property.AlignContent;
 justifyItems?: Property.JustifyItems;
 justifyContent?: Property.JustifyContent;
 flexWrap?: Property.FlexWrap;
 flexDirection?: Property.FlexDirection;
 flex?: Property.Flex;
 flexGrow?: Property.FlexGrow;
 flexShrink?: Property.FlexShrink;
 flexBasis?: Property.FlexBasis;
 justifySelf?: Property.JustifySelf;
 alignSelf?: Property.AlignSelf;
 order?: Property.Order;
}





export interface GridProps {
 gridGap?: Property.GridGap | number;
 gridRowGap?: Property.GridRowGap | number;
 gridColumnGap?: Property.GridColumnGap | number;
 gridColumn?: Property.GridColumn;
 gridRow?: Property.GridRow;
 gridArea?: Property.GridArea;
 gridAutoFlow?: Property.GridAutoFlow;
 gridAutoRows?: Property.GridAutoRows;
 gridAutoColumns?: Property.GridAutoColumns;
 gridTemplateRows?: Property.GridTemplateRows;
 gridTemplateColumns?: Property.GridTemplateColumns;
 gridTemplateAreas?: Property.GridTemplateAreas;
}





export interface SpacingProps {
 
 margin?: Property.Margin | number;
 m?: Property.Margin | number;
 marginTop?: Property.MarginTop | number;
 mt?: Property.MarginTop | number;
 marginRight?: Property.MarginRight | number;
 mr?: Property.MarginRight | number;
 marginBottom?: Property.MarginBottom | number;
 mb?: Property.MarginBottom | number;
 marginLeft?: Property.MarginLeft | number;
 ml?: Property.MarginLeft | number;
 marginX?: Property.Margin | number;
 mx?: Property.Margin | number;
 marginY?: Property.Margin | number;
 my?: Property.Margin | number;

 
 padding?: Property.Padding | number;
 p?: Property.Padding | number;
 paddingTop?: Property.PaddingTop | number;
 pt?: Property.PaddingTop | number;
 paddingRight?: Property.PaddingRight | number;
 pr?: Property.PaddingRight | number;
 paddingBottom?: Property.PaddingBottom | number;
 pb?: Property.PaddingBottom | number;
 paddingLeft?: Property.PaddingLeft | number;
 pl?: Property.PaddingLeft | number;
 paddingX?: Property.Padding | number;
 px?: Property.Padding | number;
 paddingY?: Property.Padding | number;
 py?: Property.Padding | number;
}





export interface ColorProps {
 color?: Property.Color;
 backgroundColor?: Property.BackgroundColor;
 bg?: Property.BackgroundColor; 
 opacity?: Property.Opacity;
 background?: Property.Background;
}





export interface TypographyProps {
 fontFamily?: Property.FontFamily;
 fontSize?: Property.FontSize | number;
 fontWeight?: Property.FontWeight;
 lineHeight?: Property.LineHeight | number;
 letterSpacing?: Property.LetterSpacing;
 textAlign?: Property.TextAlign;
 fontStyle?: Property.FontStyle;
 textTransform?: Property.TextTransform;
 textDecoration?: Property.TextDecoration;
 whiteSpace?: Property.WhiteSpace;
 textOverflow?: Property.TextOverflow;
 wordBreak?: Property.WordBreak;
}





export interface BorderProps {
 border?: Property.Border;
 borderWidth?: Property.BorderWidth | number;
 borderStyle?: Property.BorderStyle;
 borderColor?: Property.BorderColor;
 borderRadius?: Property.BorderRadius | number;
 borderTop?: Property.BorderTop;
 borderTopWidth?: Property.BorderTopWidth | number;
 borderTopStyle?: Property.BorderTopStyle;
 borderTopColor?: Property.BorderTopColor;
 borderTopLeftRadius?: Property.BorderTopLeftRadius | number;
 borderTopRightRadius?: Property.BorderTopRightRadius | number;
 borderRight?: Property.BorderRight;
 borderRightWidth?: Property.BorderRightWidth | number;
 borderRightStyle?: Property.BorderRightStyle;
 borderRightColor?: Property.BorderRightColor;
 borderBottom?: Property.BorderBottom;
 borderBottomWidth?: Property.BorderBottomWidth | number;
 borderBottomStyle?: Property.BorderBottomStyle;
 borderBottomColor?: Property.BorderBottomColor;
 borderBottomLeftRadius?: Property.BorderBottomLeftRadius | number;
 borderBottomRightRadius?: Property.BorderBottomRightRadius | number;
 borderLeft?: Property.BorderLeft;
 borderLeftWidth?: Property.BorderLeftWidth | number;
 borderLeftStyle?: Property.BorderLeftStyle;
 borderLeftColor?: Property.BorderLeftColor;
 borderX?: Property.Border;
 borderY?: Property.Border;
}





export interface PositionProps {
 position?: Property.Position;
 zIndex?: Property.ZIndex;
 top?: Property.Top | number;
 right?: Property.Right | number;
 bottom?: Property.Bottom | number;
 left?: Property.Left | number;
 inset?: Property.Inset | number;
}





export interface ShadowProps {
 boxShadow?: Property.BoxShadow;
 textShadow?: Property.TextShadow;
}





export interface StyleProps
 extends
  LayoutProps,
  FlexboxProps,
  GridProps,
  SpacingProps,
  ColorProps,
  TypographyProps,
  BorderProps,
  PositionProps,
  ShadowProps {}





export interface PseudoProps {
 _hover?: StyleProps;
 _active?: StyleProps;
 _focus?: StyleProps;
 _disabled?: StyleProps;
 _selected?: StyleProps;
 _invalid?: StyleProps;
 _checked?: StyleProps;
}





export interface SystemProps extends StyleProps, PseudoProps {}
