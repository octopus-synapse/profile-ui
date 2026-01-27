





export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'primary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill' | 'square';





export interface BadgeState {
  readonly variant: BadgeVariant;
  readonly size: BadgeSize;
  readonly shape: BadgeShape;
  readonly dot: boolean;
  readonly removable: boolean;
}





export class BadgeEntity {
  private constructor(private readonly state: BadgeState) {}

  
  static create(params: Partial<BadgeState>): BadgeEntity {
    return new BadgeEntity({
      variant: params.variant ?? 'default',
      size: params.size ?? 'md',
      shape: params.shape ?? 'rounded',
      dot: params.dot ?? false,
      removable: params.removable ?? false,
    });
  }

  
  get currentState(): BadgeState {
    return { ...this.state };
  }

  
  get isInteractive(): boolean {
    return this.state.removable;
  }

  
  withVariant(variant: BadgeVariant): BadgeEntity {
    return new BadgeEntity({
      ...this.state,
      variant,
    });
  }

  
  withSize(size: BadgeSize): BadgeEntity {
    return new BadgeEntity({
      ...this.state,
      size,
    });
  }

  
  withShape(shape: BadgeShape): BadgeEntity {
    return new BadgeEntity({
      ...this.state,
      shape,
    });
  }

  
  withDot(dot: boolean): BadgeEntity {
    return new BadgeEntity({
      ...this.state,
      dot,
    });
  }

  
  withRemovable(removable: boolean): BadgeEntity {
    return new BadgeEntity({
      ...this.state,
      removable,
    });
  }
}
