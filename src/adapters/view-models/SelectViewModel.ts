export interface SelectViewModel<T = string> {
  readonly open: boolean;
  readonly selected: T | null;
  readonly disabled: boolean;
  readonly interactive: boolean;
  readonly styles: {
    readonly trigger: {
      readonly background: string;
      readonly border: string;
      readonly text: string;
      readonly placeholder: string;
      readonly paddingH: number;
      readonly paddingV: number;
      readonly radius: number;
    };
    readonly dropdown: {
      readonly background: string;
      readonly border: string;
      readonly shadow: string;
      readonly radius: number;
    };
  };
  readonly ariaExpanded: boolean;
  readonly ariaDisabled: boolean;
}
