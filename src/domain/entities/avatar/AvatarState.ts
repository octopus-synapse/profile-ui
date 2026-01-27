

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy' | null;

export interface AvatarState {
  readonly src: string | null;
  readonly alt: string;
  readonly fallback: string | null;
  readonly size: AvatarSize;
  readonly shape: AvatarShape;
  readonly ring: boolean;
  readonly status: AvatarStatus;
}

export class AvatarEntity {
  private constructor(private readonly state: AvatarState) {}

  static create(params: Partial<AvatarState>): AvatarEntity {
    return new AvatarEntity({
      src: params.src ?? null,
      alt: params.alt ?? '',
      fallback: params.fallback ?? null,
      size: params.size ?? 'md',
      shape: params.shape ?? 'circle',
      ring: params.ring ?? false,
      status: params.status ?? null,
    });
  }

  get currentState(): AvatarState {
    return { ...this.state };
  }

  get hasImage(): boolean {
    return this.state.src !== null && this.state.src.length > 0;
  }

  get hasStatus(): boolean {
    return this.state.status !== null;
  }

  withSrc(src: string | null): AvatarEntity {
    return new AvatarEntity({ ...this.state, src });
  }

  withSize(size: AvatarSize): AvatarEntity {
    return new AvatarEntity({ ...this.state, size });
  }

  withShape(shape: AvatarShape): AvatarEntity {
    return new AvatarEntity({ ...this.state, shape });
  }

  withRing(ring: boolean): AvatarEntity {
    return new AvatarEntity({ ...this.state, ring });
  }

  withStatus(status: AvatarStatus): AvatarEntity {
    return new AvatarEntity({ ...this.state, status });
  }
}
