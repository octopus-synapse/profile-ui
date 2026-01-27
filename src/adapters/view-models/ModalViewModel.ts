

export interface ModalViewModel {
  
  readonly open: boolean;
  readonly interactive: boolean;
  readonly animating: boolean;

  
  readonly shouldLockBodyScroll: boolean;
  readonly shouldTrapFocus: boolean;
  readonly canDismissViaEscape: boolean;
  readonly canDismissViaBackdrop: boolean;

  
  readonly styles: {
    readonly maxWidth: string;
    readonly padding: string;
    readonly backgroundColor: string;
    readonly borderColor: string;
    readonly borderRadius: string;
    readonly overlayBackground: string;
  };

  
  readonly animationState: 'closed' | 'opening' | 'open' | 'closing';

  
  readonly ariaModal: boolean;
  readonly ariaHidden: boolean;
  readonly role: string;
}
