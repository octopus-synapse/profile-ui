





export type SkeletonVariant = 'rectangular' | 'circular' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'shimmer' | 'none';





export interface SkeletonState {
  readonly width: string | number;
  readonly height: string | number;
  readonly variant: SkeletonVariant;
  readonly animation: SkeletonAnimation;
}





export class SkeletonEntity {
  private constructor(private readonly state: SkeletonState) {}

  
  static create(params: Partial<SkeletonState>): SkeletonEntity {
    return new SkeletonEntity({
      width: params.width ?? '100%',
      height: params.height ?? 20,
      variant: params.variant ?? 'rectangular',
      animation: params.animation ?? 'pulse',
    });
  }

  
  get currentState(): SkeletonState {
    return { ...this.state };
  }

  
  get isAnimated(): boolean {
    return this.state.animation !== 'none';
  }

  
  withWidth(width: string | number): SkeletonEntity {
    return new SkeletonEntity({
      ...this.state,
      width,
    });
  }

  
  withHeight(height: string | number): SkeletonEntity {
    return new SkeletonEntity({
      ...this.state,
      height,
    });
  }

  
  withVariant(variant: SkeletonVariant): SkeletonEntity {
    return new SkeletonEntity({
      ...this.state,
      variant,
    });
  }

  
  withAnimation(animation: SkeletonAnimation): SkeletonEntity {
    return new SkeletonEntity({
      ...this.state,
      animation,
    });
  }
}
