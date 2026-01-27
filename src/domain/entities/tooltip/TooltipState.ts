export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipState {
  readonly visible: boolean;
  readonly position: TooltipPosition;
  readonly delay: number;
  readonly disabled: boolean;
}

export class TooltipEntity {
  private constructor(private readonly state: TooltipState) {}

  static create(params: Partial<TooltipState>): TooltipEntity {
    return new TooltipEntity({
      visible: params.visible ?? false,
      position: params.position ?? 'top',
      delay: params.delay ?? 200,
      disabled: params.disabled ?? false,
    });
  }

  get currentState(): TooltipState {
    return { ...this.state };
  }

  get canShow(): boolean {
    return !this.state.disabled;
  }

  withVisible(visible: boolean): TooltipEntity {
    return new TooltipEntity({ ...this.state, visible: this.state.disabled ? false : visible });
  }

  withPosition(position: TooltipPosition): TooltipEntity {
    return new TooltipEntity({ ...this.state, position });
  }

  withDelay(delay: number): TooltipEntity {
    return new TooltipEntity({ ...this.state, delay });
  }

  withDisabled(disabled: boolean): TooltipEntity {
    return new TooltipEntity({ ...this.state, disabled, visible: disabled ? false : this.state.visible });
  }
}
