import { SkeletonProps, skeletonTokens } from '../../shared/skeleton/skeleton.types';

export function useSkeleton(props: Partial<SkeletonProps> = {}) {
  const { variant = 'rectangular', animation = 'pulse' } = props;

  const borderRadius = skeletonTokens.shapes[variant];

  return {
    state: {
      variant,
      animation,
    },
    styles: {
      borderRadius,
      baseColor: skeletonTokens.colors.base,
      highlightColor: skeletonTokens.colors.highlight,
    },
  };
}
