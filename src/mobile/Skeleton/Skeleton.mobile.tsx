/**
 * Skeleton - Mobile Implementation
 * @layer Infrastructure (Mobile)
 */

import { useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import {
 useSkeleton,
 type SkeletonProps,
 skeletonTokens,
} from "../../shared/Skeleton";

export interface MobileSkeletonProps extends SkeletonProps {}

export function Skeleton({
 width = "100%",
 height = 20,
 testID,
 ...props
}: MobileSkeletonProps) {
 const { radius, animation } = useSkeleton(props);
 const opacity = useRef(new Animated.Value(1)).current;

 useEffect(() => {
  if (animation === "pulse") {
   const anim = Animated.loop(
    Animated.sequence([
     Animated.timing(opacity, {
      toValue: 0.5,
      duration: 800,
      useNativeDriver: true,
     }),
     Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
     }),
    ])
   );
   anim.start();
   return () => anim.stop();
  }
 }, [animation, opacity]);

 return (
  <Animated.View
   testID={testID}
   style={
    {
     width,
     height,
     borderRadius: radius,
     backgroundColor: skeletonTokens.colors.base,
     opacity: animation !== "none" ? opacity : 1,
    } as any
   }
  />
 );
}

// ─── Skeleton Variants ───────────────────────────────────────────────────────

export interface SkeletonTextProps {
 lines?: number;
 testID?: string;
}

export function SkeletonText({ lines = 3, testID }: SkeletonTextProps) {
 return (
  <View testID={testID} style={{ gap: skeletonTokens.text.gap }}>
   {Array.from({ length: lines }).map((_, i) => (
    <Skeleton
     key={i}
     width={i === lines - 1 ? "60%" : "100%"}
     height={skeletonTokens.text.height}
     variant="rounded"
    />
   ))}
  </View>
 );
}

export interface SkeletonAvatarProps {
 size?: number;
}

export function SkeletonAvatar({ size = 40 }: SkeletonAvatarProps) {
 return <Skeleton width={size} height={size} variant="circular" />;
}
