export interface TabsState {
  readonly selectedValue: string;
  readonly variant: 'default' | 'underline' | 'pills';
}

export class TabsEntity {
  private constructor(private readonly state: TabsState) {}

  static create(params: { selectedValue: string; variant?: 'default' | 'underline' | 'pills' }): TabsEntity {
    return new TabsEntity({
      selectedValue: params.selectedValue,
      variant: params.variant ?? 'default',
    });
  }

  get currentState(): TabsState {
    return { ...this.state };
  }

  isSelected(value: string): boolean {
    return this.state.selectedValue === value;
  }

  withSelectedValue(selectedValue: string): TabsEntity {
    return new TabsEntity({ ...this.state, selectedValue });
  }

  withVariant(variant: 'default' | 'underline' | 'pills'): TabsEntity {
    return new TabsEntity({ ...this.state, variant });
  }
}
