/**
 * Avatar - Mobile Implementation (React Native)
 *
 * Implements Avatar for React Native/Expo.
 * Composes from shared base component.
 *
 * @principle Dependency Inversion - Depends on shared abstraction
 * @layer Infrastructure (Mobile)
 */

import React from "react";
import {
 View,
 Image,
 Text,
 type ViewStyle,
 type TextStyle,
 type ImageStyle,
} from "react-native";
import {
 useAvatar,
 type AvatarProps,
 type AvatarGroupProps,
 avatarTokens,
} from "../../shared/avatar";

// =============================================================================
// Avatar Component (Mobile)
// =============================================================================

export function Avatar(props: AvatarProps) {
 const { alt, testID } = props;
 const {
  showImage,
  handleImageError,
  initials,
  sizeToken,
  shapeToken,
  statusToken,
  src,
  ring,
 } = useAvatar(props);

 const containerStyle: ViewStyle = {
  width: sizeToken.dimension,
  height: sizeToken.dimension,
  borderRadius: shapeToken.borderRadius,
  backgroundColor: avatarTokens.colors.background,
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  ...(ring && {
   borderWidth: 2,
   borderColor: avatarTokens.colors.ring,
  }),
 };

 const imageStyle: ImageStyle = {
  width: "100%",
  height: "100%",
 };

 const textStyle: TextStyle = {
  fontSize: sizeToken.fontSize,
  fontWeight: "500",
  color: avatarTokens.colors.text,
 };

 const statusSize = Math.max(8, sizeToken.dimension / 5);
 const statusStyle: ViewStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
  width: statusSize,
  height: statusSize,
  borderRadius: statusSize / 2,
  borderWidth: 2,
  borderColor: avatarTokens.colors.border,
  backgroundColor: statusToken?.color,
 };

 return (
  <View
   style={containerStyle}
   testID={testID}
   accessibilityLabel={alt || props.fallback || "Avatar"}
   accessibilityRole="image"
  >
   {showImage ? (
    <Image
     source={{ uri: src! }}
     style={imageStyle}
     onError={handleImageError}
     accessibilityLabel={alt || props.fallback}
    />
   ) : (
    <Text style={textStyle}>{initials || "?"}</Text>
   )}

   {statusToken && (
    <View style={statusStyle} accessibilityLabel={statusToken.label} />
   )}
  </View>
 );
}

// =============================================================================
// AvatarGroup Component (Mobile)
// =============================================================================

export function AvatarGroup({
 children,
 max = 3,
 size = "md",
 shape = "circle",
 testID,
}: AvatarGroupProps) {
 const childArray = React.Children.toArray(children);
 const visible = childArray.slice(0, max);
 const remaining = childArray.length - max;

 const sizeToken = avatarTokens.sizes[size];
 const shapeToken = avatarTokens.shapes[shape];

 const containerStyle: ViewStyle = {
  flexDirection: "row",
 };

 const childWrapperStyle: ViewStyle = {
  marginLeft: avatarTokens.group.overlap,
 };

 const remainingStyle: ViewStyle = {
  width: sizeToken.dimension,
  height: sizeToken.dimension,
  borderRadius: shapeToken.borderRadius,
  backgroundColor: "#262626",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: avatarTokens.group.overlap,
  borderWidth: 2,
  borderColor: avatarTokens.colors.border,
 };

 const remainingTextStyle: TextStyle = {
  fontSize: sizeToken.fontSize,
  fontWeight: "500",
  color: avatarTokens.colors.text,
 };

 return (
  <View
   style={containerStyle}
   testID={testID}
   accessibilityLabel={`Group of ${childArray.length} avatars`}
  >
   {visible.map((child, index) => (
    <View key={index} style={index > 0 ? childWrapperStyle : undefined}>
     {child}
    </View>
   ))}

   {remaining > 0 && (
    <View style={remainingStyle} accessibilityLabel={`${remaining} more`}>
     <Text style={remainingTextStyle}>+{remaining}</Text>
    </View>
   )}
  </View>
 );
}
