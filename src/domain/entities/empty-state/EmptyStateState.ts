





export type EmptyStateSize = 'sm' | 'md' | 'lg';





export interface EmptyStateState {
  readonly title: string;
  readonly description: string | null;
  readonly hasIcon: boolean;
  readonly hasAction: boolean;
  readonly size: EmptyStateSize;
}





export class EmptyStateEntity {
  private constructor(private readonly state: EmptyStateState) {
    this.validate();
  }

  
  static create(params: Partial<EmptyStateState> & { title: string }): EmptyStateEntity {
    return new EmptyStateEntity({
      title: params.title,
      description: params.description ?? null,
      hasIcon: params.hasIcon ?? false,
      hasAction: params.hasAction ?? false,
      size: params.size ?? 'md',
    });
  }

  
  private validate(): void {
    if (!this.state.title || this.state.title.trim().length === 0) {
      throw new Error('EmptyState must have a non-empty title');
    }
  }

  
  get currentState(): EmptyStateState {
    return { ...this.state };
  }

  
  get isInteractive(): boolean {
    return this.state.hasAction;
  }

  
  withTitle(title: string): EmptyStateEntity {
    return new EmptyStateEntity({
      ...this.state,
      title,
    });
  }

  
  withDescription(description: string | null): EmptyStateEntity {
    return new EmptyStateEntity({
      ...this.state,
      description,
    });
  }

  
  withHasIcon(hasIcon: boolean): EmptyStateEntity {
    return new EmptyStateEntity({
      ...this.state,
      hasIcon,
    });
  }

  
  withHasAction(hasAction: boolean): EmptyStateEntity {
    return new EmptyStateEntity({
      ...this.state,
      hasAction,
    });
  }

  
  withSize(size: EmptyStateSize): EmptyStateEntity {
    return new EmptyStateEntity({
      ...this.state,
      size,
    });
  }
}
