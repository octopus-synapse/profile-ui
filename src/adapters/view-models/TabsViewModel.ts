export interface TabsViewModel {
  readonly selectedValue: string;
  readonly variant: 'default' | 'underline' | 'pills';
  readonly styles: {
    readonly background: string;
    readonly activeBackground: string;
    readonly border: string;
    readonly activeBorder: string;
    readonly text: string;
    readonly activeText: string;
    readonly gap: number;
    readonly padding: number;
    readonly radius: number;
  };
}
