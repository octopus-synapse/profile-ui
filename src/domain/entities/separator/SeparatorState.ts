





export type SeparatorOrientation = 'horizontal' | 'vertical';





export interface SeparatorState {
  readonly orientation: SeparatorOrientation;
  readonly decorative: boolean;
}





export class SeparatorEntity {
  private constructor(private readonly state: SeparatorState) {}

  
  static create(params: Partial<SeparatorState>): SeparatorEntity {
    return new SeparatorEntity({
      orientation: params.orientation ?? 'horizontal',
      decorative: params.decorative ?? true,
    });
  }

  
  get currentState(): SeparatorState {
    return { ...this.state };
  }

  
  get ariaRole(): 'none' | 'separator' {
    return this.state.decorative ? 'none' : 'separator';
  }

  
  withOrientation(orientation: SeparatorOrientation): SeparatorEntity {
    return new SeparatorEntity({
      ...this.state,
      orientation,
    });
  }

  
  withDecorative(decorative: boolean): SeparatorEntity {
    return new SeparatorEntity({
      ...this.state,
      decorative,
    });
  }
}
