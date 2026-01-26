export interface TooltipViewModel {
  readonly visible: boolean;
  readonly position: 'top' | 'bottom' | 'left' | 'right';
  readonly delay: number;
  readonly disabled: boolean;
  readonly canShow: boolean;
  readonly styles: {
    readonly background: string;
    readonly text: string;
    readonly border: string;
    readonly radius: number;
    readonly paddingH: number;
    readonly paddingV: number;
    readonly fontSize: number;
    readonly offset: number;
  };
  readonly role: string;
}
