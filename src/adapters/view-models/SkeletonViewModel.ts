

export interface SkeletonViewModel {
  
  readonly width: string | number;
  readonly height: string | number;
  readonly variant: 'rectangular' | 'circular' | 'rounded';
  readonly animation: 'pulse' | 'shimmer' | 'none';
  readonly isAnimated: boolean;

  
  readonly styles: {
    readonly borderRadius: number;
    readonly baseColor: string;
    readonly highlightColor: string;
  };

  
  readonly ariaLabel: string;
  readonly ariaLive: 'polite';
}
