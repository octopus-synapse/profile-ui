





export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ModalAnimationState = 'closed' | 'opening' | 'open' | 'closing';





export interface ModalState {
  readonly open: boolean;
  readonly size: ModalSize;
  readonly closeOnEscape: boolean;
  readonly closeOnBackdropClick: boolean;
  readonly preventBodyScroll: boolean;
  readonly focusTrapped: boolean;
  readonly animationState: ModalAnimationState;
}





export class ModalEntity {
  
  private constructor(private readonly state: ModalState) {
    this.validate();
  }

  
  static create(params: Partial<ModalState>): ModalEntity {
    const open = params.open ?? false;

    
    let animationState = params.animationState;
    if (animationState === undefined) {
      animationState = open ? 'open' : 'closed';
    }

    return new ModalEntity({
      open,
      size: params.size ?? 'md',
      closeOnEscape: params.closeOnEscape ?? true,
      closeOnBackdropClick: params.closeOnBackdropClick ?? true,
      preventBodyScroll: params.preventBodyScroll ?? true,
      focusTrapped: params.focusTrapped ?? true,
      animationState,
    });
  }

  
  private validate(): void {
    
    
    if (this.state.open && !this.state.focusTrapped) {
      throw new Error('Open modals must have focus trap enabled');
    }

    
    
    if (!this.state.open && (this.state.animationState === 'open' || this.state.animationState === 'opening')) {
      throw new Error('Closed modals cannot have opening/open animation state');
    }

    
    
    if (this.state.open && this.state.animationState === 'closed') {
      throw new Error('Open modals cannot have closed animation state');
    }
  }

  
  get isInteractive(): boolean {
    return this.state.open;
  }

  
  get shouldLockBodyScroll(): boolean {
    return this.state.open && this.state.preventBodyScroll;
  }

  
  get shouldTrapFocus(): boolean {
    return this.state.open && this.state.focusTrapped;
  }

  
  get canDismissViaEscape(): boolean {
    return this.state.open && this.state.closeOnEscape;
  }

  
  get canDismissViaBackdrop(): boolean {
    return this.state.open && this.state.closeOnBackdropClick;
  }

  
  get isAnimating(): boolean {
    return this.state.animationState === 'opening' || this.state.animationState === 'closing';
  }

  
  get currentState(): ModalState {
    return { ...this.state };
  }

  
  withOpen(): ModalEntity {
    return new ModalEntity({
      ...this.state,
      open: true,
      animationState: 'opening',
      focusTrapped: true, 
    });
  }

  
  withClosed(): ModalEntity {
    return new ModalEntity({
      ...this.state,
      open: false,
      animationState: 'closing',
    });
  }

  
  withAnimationOpen(): ModalEntity {
    if (!this.state.open) {
      throw new Error('Cannot set animation to open when modal is closed');
    }
    return new ModalEntity({
      ...this.state,
      animationState: 'open',
    });
  }

  
  withAnimationClosed(): ModalEntity {
    if (this.state.open) {
      throw new Error('Cannot set animation to closed when modal is open');
    }
    return new ModalEntity({
      ...this.state,
      animationState: 'closed',
    });
  }

  
  withSize(size: ModalSize): ModalEntity {
    return new ModalEntity({
      ...this.state,
      size,
    });
  }

  
  withCloseOnEscape(closeOnEscape: boolean): ModalEntity {
    return new ModalEntity({
      ...this.state,
      closeOnEscape,
    });
  }

  
  withCloseOnBackdropClick(closeOnBackdropClick: boolean): ModalEntity {
    return new ModalEntity({
      ...this.state,
      closeOnBackdropClick,
    });
  }

  
  withPreventBodyScroll(preventBodyScroll: boolean): ModalEntity {
    return new ModalEntity({
      ...this.state,
      preventBodyScroll,
    });
  }
}
