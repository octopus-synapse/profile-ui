

import { describe, it, expect } from 'bun:test';
import { ModalEntity, ModalSize, ModalAnimationState } from '../ModalState';

describe('ModalEntity', () => {
  
  
  

  describe('Factory Creation', () => {
    it('should create modal with default values', () => {
      const modal = ModalEntity.create({});

      expect(modal.currentState).toEqual({
        open: false,
        size: 'md',
        closeOnEscape: true,
        closeOnBackdropClick: true,
        preventBodyScroll: true,
        focusTrapped: true,
        animationState: 'closed',
      });
    });

    it('should create modal with custom open state', () => {
      const modal = ModalEntity.create({ open: true });
      expect(modal.currentState.open).toBe(true);
    });

    it('should create modal with custom size', () => {
      const modal = ModalEntity.create({ size: 'lg' });
      expect(modal.currentState.size).toBe('lg');
    });

    it('should create modal with all sizes', () => {
      const sizes: ModalSize[] = ['sm', 'md', 'lg', 'xl', 'full'];
      sizes.forEach((size) => {
        const modal = ModalEntity.create({ size });
        expect(modal.currentState.size).toBe(size);
      });
    });

    it('should create modal with closeOnEscape disabled', () => {
      const modal = ModalEntity.create({ closeOnEscape: false });
      expect(modal.currentState.closeOnEscape).toBe(false);
    });

    it('should create modal with closeOnBackdropClick disabled', () => {
      const modal = ModalEntity.create({ closeOnBackdropClick: false });
      expect(modal.currentState.closeOnBackdropClick).toBe(false);
    });

    it('should create modal with preventBodyScroll disabled', () => {
      const modal = ModalEntity.create({ preventBodyScroll: false });
      expect(modal.currentState.preventBodyScroll).toBe(false);
    });

    it('should create closed modal with focusTrapped disabled', () => {
      const modal = ModalEntity.create({ open: false, focusTrapped: false });
      expect(modal.currentState.focusTrapped).toBe(false);
    });

    it('should create modal with custom animation state', () => {
      const modal = ModalEntity.create({ open: true, animationState: 'opening' });
      expect(modal.currentState.animationState).toBe('opening');
    });
  });

  
  
  

  describe('BUSINESS RULE #1: Focus trap must be enabled when modal is open', () => {
    it('should throw error when creating open modal without focus trap', () => {
      expect(() => {
        ModalEntity.create({ open: true, focusTrapped: false });
      }).toThrow('Open modals must have focus trap enabled');
    });

    it('should allow closed modal without focus trap', () => {
      expect(() => {
        ModalEntity.create({ open: false, focusTrapped: false });
      }).not.toThrow();
    });

    it('should enforce focus trap when opening modal', () => {
      const modal = ModalEntity.create({ open: false, focusTrapped: false });
      const opened = modal.withOpen();
      expect(opened.currentState.focusTrapped).toBe(true);
    });
  });

  
  
  

  describe('BUSINESS RULE #2: Closed modals cannot have opening/open animation state', () => {
    it('should throw error for closed modal with "opening" animation state', () => {
      expect(() => {
        ModalEntity.create({ open: false, animationState: 'opening' });
      }).toThrow('Closed modals cannot have opening/open animation state');
    });

    it('should throw error for closed modal with "open" animation state', () => {
      expect(() => {
        ModalEntity.create({ open: false, animationState: 'open' });
      }).toThrow('Closed modals cannot have opening/open animation state');
    });

    it('should allow closed modal with "closed" animation state', () => {
      expect(() => {
        ModalEntity.create({ open: false, animationState: 'closed' });
      }).not.toThrow();
    });

    it('should allow closed modal with "closing" animation state', () => {
      expect(() => {
        ModalEntity.create({ open: false, animationState: 'closing' });
      }).not.toThrow();
    });
  });

  
  
  

  describe('BUSINESS RULE #3: Open modals cannot have closed animation state', () => {
    it('should throw error for open modal with "closed" animation state', () => {
      expect(() => {
        ModalEntity.create({ open: true, animationState: 'closed' });
      }).toThrow('Open modals cannot have closed animation state');
    });

    it('should allow open modal with "opening" animation state', () => {
      expect(() => {
        ModalEntity.create({ open: true, animationState: 'opening' });
      }).not.toThrow();
    });

    it('should allow open modal with "open" animation state', () => {
      expect(() => {
        ModalEntity.create({ open: true, animationState: 'open' });
      }).not.toThrow();
    });

    it('should allow open modal with "closing" animation state', () => {
      expect(() => {
        ModalEntity.create({ open: true, animationState: 'closing' });
      }).not.toThrow();
    });
  });

  
  
  

  describe('BUSINESS RULE #4: Interactive means modal is open', () => {
    it('should return false for closed modal', () => {
      const modal = ModalEntity.create({ open: false });
      expect(modal.isInteractive).toBe(false);
    });

    it('should return true for open modal', () => {
      const modal = ModalEntity.create({ open: true });
      expect(modal.isInteractive).toBe(true);
    });

    it('should return true for modal in opening state', () => {
      const modal = ModalEntity.create({ open: true, animationState: 'opening' });
      expect(modal.isInteractive).toBe(true);
    });

    it('should return true for modal in fully open state', () => {
      const modal = ModalEntity.create({ open: true, animationState: 'open' });
      expect(modal.isInteractive).toBe(true);
    });

    it('should return true for modal in closing state (still technically open)', () => {
      const modal = ModalEntity.create({ open: true, animationState: 'closing' });
      expect(modal.isInteractive).toBe(true);
    });
  });

  
  
  

  describe('BUSINESS RULE #5: Modal should lock body scroll when open', () => {
    it('should lock body scroll when modal is open', () => {
      const modal = ModalEntity.create({ open: true });
      expect(modal.shouldLockBodyScroll).toBe(true);
    });

    it('should not lock body scroll when modal is closed', () => {
      const modal = ModalEntity.create({ open: false });
      expect(modal.shouldLockBodyScroll).toBe(false);
    });

    it('should not lock body scroll when preventBodyScroll is false', () => {
      const modal = ModalEntity.create({ open: true, preventBodyScroll: false });
      expect(modal.shouldLockBodyScroll).toBe(false);
    });

    it('should respect preventBodyScroll setting when modal opens', () => {
      const modal = ModalEntity.create({ preventBodyScroll: false });
      const opened = modal.withOpen();
      expect(opened.shouldLockBodyScroll).toBe(false);
    });
  });

  
  
  

  describe('BUSINESS RULE #6: Modal should trap focus when open', () => {
    it('should trap focus when modal is open', () => {
      const modal = ModalEntity.create({ open: true });
      expect(modal.shouldTrapFocus).toBe(true);
    });

    it('should not trap focus when modal is closed', () => {
      const modal = ModalEntity.create({ open: false, focusTrapped: false });
      expect(modal.shouldTrapFocus).toBe(false);
    });

    it('should always trap focus for open modals (enforced by rule #1)', () => {
      const modal = ModalEntity.create({ open: true, focusTrapped: true });
      expect(modal.shouldTrapFocus).toBe(true);
    });
  });

  
  
  

  describe('BUSINESS RULE #7: Modal can be dismissed via escape key', () => {
    it('should allow escape dismissal when modal is open and closeOnEscape is true', () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: true });
      expect(modal.canDismissViaEscape).toBe(true);
    });

    it('should not allow escape dismissal when modal is closed', () => {
      const modal = ModalEntity.create({ open: false, closeOnEscape: true });
      expect(modal.canDismissViaEscape).toBe(false);
    });

    it('should not allow escape dismissal when closeOnEscape is false', () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: false });
      expect(modal.canDismissViaEscape).toBe(false);
    });

    it('should not allow escape dismissal when both conditions are false', () => {
      const modal = ModalEntity.create({ open: false, closeOnEscape: false });
      expect(modal.canDismissViaEscape).toBe(false);
    });
  });

  
  
  

  describe('BUSINESS RULE #8: Modal can be dismissed via backdrop click', () => {
    it('should allow backdrop dismissal when modal is open and closeOnBackdropClick is true', () => {
      const modal = ModalEntity.create({ open: true, closeOnBackdropClick: true });
      expect(modal.canDismissViaBackdrop).toBe(true);
    });

    it('should not allow backdrop dismissal when modal is closed', () => {
      const modal = ModalEntity.create({ open: false, closeOnBackdropClick: true });
      expect(modal.canDismissViaBackdrop).toBe(false);
    });

    it('should not allow backdrop dismissal when closeOnBackdropClick is false', () => {
      const modal = ModalEntity.create({ open: true, closeOnBackdropClick: false });
      expect(modal.canDismissViaBackdrop).toBe(false);
    });

    it('should not allow backdrop dismissal when both conditions are false', () => {
      const modal = ModalEntity.create({ open: false, closeOnBackdropClick: false });
      expect(modal.canDismissViaBackdrop).toBe(false);
    });
  });

  
  
  

  describe('BUSINESS RULE #9: Modal is animating', () => {
    it('should return true when animation state is "opening"', () => {
      const modal = ModalEntity.create({ open: true, animationState: 'opening' });
      expect(modal.isAnimating).toBe(true);
    });

    it('should return true when animation state is "closing"', () => {
      const modal = ModalEntity.create({ open: false, animationState: 'closing' });
      expect(modal.isAnimating).toBe(true);
    });

    it('should return false when animation state is "open"', () => {
      const modal = ModalEntity.create({ open: true, animationState: 'open' });
      expect(modal.isAnimating).toBe(false);
    });

    it('should return false when animation state is "closed"', () => {
      const modal = ModalEntity.create({ open: false, animationState: 'closed' });
      expect(modal.isAnimating).toBe(false);
    });
  });

  
  
  

  describe('Immutability', () => {
    it('should return new instance when opening modal', () => {
      const modal = ModalEntity.create({ open: false });
      const opened = modal.withOpen();
      expect(opened).not.toBe(modal);
    });

    it('should not mutate original when opening modal', () => {
      const modal = ModalEntity.create({ open: false });
      const originalState = modal.currentState;
      modal.withOpen();
      expect(modal.currentState).toEqual(originalState);
    });

    it('should return new instance when closing modal', () => {
      const modal = ModalEntity.create({ open: true });
      const closed = modal.withClosed();
      expect(closed).not.toBe(modal);
    });

    it('should not mutate original when closing modal', () => {
      const modal = ModalEntity.create({ open: true });
      const originalState = modal.currentState;
      modal.withClosed();
      expect(modal.currentState).toEqual(originalState);
    });

    it('should return defensive copy of state', () => {
      const modal = ModalEntity.create({});
      const state1 = modal.currentState;
      const state2 = modal.currentState;
      expect(state1).not.toBe(state2);
      expect(state1).toEqual(state2);
    });
  });

  
  
  

  describe('Opening Modal', () => {
    it('should set open to true', () => {
      const modal = ModalEntity.create({ open: false });
      const opened = modal.withOpen();
      expect(opened.currentState.open).toBe(true);
    });

    it('should set animation state to "opening"', () => {
      const modal = ModalEntity.create({ open: false });
      const opened = modal.withOpen();
      expect(opened.currentState.animationState).toBe('opening');
    });

    it('should enable focus trap', () => {
      const modal = ModalEntity.create({ open: false, focusTrapped: false });
      const opened = modal.withOpen();
      expect(opened.currentState.focusTrapped).toBe(true);
    });

    it('should preserve size when opening', () => {
      const modal = ModalEntity.create({ size: 'lg' });
      const opened = modal.withOpen();
      expect(opened.currentState.size).toBe('lg');
    });

    it('should preserve closeOnEscape when opening', () => {
      const modal = ModalEntity.create({ closeOnEscape: false });
      const opened = modal.withOpen();
      expect(opened.currentState.closeOnEscape).toBe(false);
    });

    it('should preserve closeOnBackdropClick when opening', () => {
      const modal = ModalEntity.create({ closeOnBackdropClick: false });
      const opened = modal.withOpen();
      expect(opened.currentState.closeOnBackdropClick).toBe(false);
    });
  });

  
  
  

  describe('Closing Modal', () => {
    it('should set open to false', () => {
      const modal = ModalEntity.create({ open: true });
      const closed = modal.withClosed();
      expect(closed.currentState.open).toBe(false);
    });

    it('should set animation state to "closing"', () => {
      const modal = ModalEntity.create({ open: true });
      const closed = modal.withClosed();
      expect(closed.currentState.animationState).toBe('closing');
    });

    it('should preserve size when closing', () => {
      const modal = ModalEntity.create({ open: true, size: 'xl' });
      const closed = modal.withClosed();
      expect(closed.currentState.size).toBe('xl');
    });

    it('should preserve focusTrapped setting (for next open)', () => {
      const modal = ModalEntity.create({ open: true });
      const closed = modal.withClosed();
      expect(closed.currentState.focusTrapped).toBe(true);
    });
  });

  
  
  

  describe('Animation State Transitions', () => {
    it('should transition from "opening" to "open"', () => {
      const modal = ModalEntity.create({ open: true, animationState: 'opening' });
      const fullyOpen = modal.withAnimationOpen();
      expect(fullyOpen.currentState.animationState).toBe('open');
    });

    it('should throw error when transitioning to "open" while closed', () => {
      const modal = ModalEntity.create({ open: false });
      expect(() => {
        modal.withAnimationOpen();
      }).toThrow('Cannot set animation to open when modal is closed');
    });

    it('should transition from "closing" to "closed"', () => {
      const modal = ModalEntity.create({ open: false, animationState: 'closing' });
      const fullyClosed = modal.withAnimationClosed();
      expect(fullyClosed.currentState.animationState).toBe('closed');
    });

    it('should throw error when transitioning to "closed" while open', () => {
      const modal = ModalEntity.create({ open: true });
      expect(() => {
        modal.withAnimationClosed();
      }).toThrow('Cannot set animation to closed when modal is open');
    });
  });

  
  
  

  describe('Size Updates', () => {
    it('should update size immutably', () => {
      const modal = ModalEntity.create({ size: 'md' });
      const updated = modal.withSize('lg');
      expect(updated.currentState.size).toBe('lg');
      expect(modal.currentState.size).toBe('md');
    });

    it('should preserve other state when updating size', () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: false });
      const updated = modal.withSize('sm');
      expect(updated.currentState.open).toBe(true);
      expect(updated.currentState.closeOnEscape).toBe(false);
    });
  });

  
  
  

  describe('Configuration Updates', () => {
    it('should update closeOnEscape immutably', () => {
      const modal = ModalEntity.create({ closeOnEscape: true });
      const updated = modal.withCloseOnEscape(false);
      expect(updated.currentState.closeOnEscape).toBe(false);
      expect(modal.currentState.closeOnEscape).toBe(true);
    });

    it('should update closeOnBackdropClick immutably', () => {
      const modal = ModalEntity.create({ closeOnBackdropClick: true });
      const updated = modal.withCloseOnBackdropClick(false);
      expect(updated.currentState.closeOnBackdropClick).toBe(false);
      expect(modal.currentState.closeOnBackdropClick).toBe(true);
    });

    it('should update preventBodyScroll immutably', () => {
      const modal = ModalEntity.create({ preventBodyScroll: true });
      const updated = modal.withPreventBodyScroll(false);
      expect(updated.currentState.preventBodyScroll).toBe(false);
      expect(modal.currentState.preventBodyScroll).toBe(true);
    });
  });

  
  
  

  describe('Complex Scenarios', () => {
    it('should handle full open-close lifecycle', () => {
      
      const modal = ModalEntity.create({ open: false });
      expect(modal.currentState.animationState).toBe('closed');

      
      const opening = modal.withOpen();
      expect(opening.currentState.open).toBe(true);
      expect(opening.currentState.animationState).toBe('opening');
      expect(opening.isAnimating).toBe(true);

      
      const opened = opening.withAnimationOpen();
      expect(opened.currentState.animationState).toBe('open');
      expect(opened.isAnimating).toBe(false);

      
      const closing = opened.withClosed();
      expect(closing.currentState.open).toBe(false);
      expect(closing.currentState.animationState).toBe('closing');
      expect(closing.isAnimating).toBe(true);

      
      const closed = closing.withAnimationClosed();
      expect(closed.currentState.animationState).toBe('closed');
      expect(closed.isAnimating).toBe(false);
    });

    it('should maintain configuration through open-close cycle', () => {
      const modal = ModalEntity.create({
        size: 'xl',
        closeOnEscape: false,
        closeOnBackdropClick: false,
      });

      const opened = modal.withOpen();
      const closed = opened.withClosed();

      expect(closed.currentState.size).toBe('xl');
      expect(closed.currentState.closeOnEscape).toBe(false);
      expect(closed.currentState.closeOnBackdropClick).toBe(false);
    });

    it('should chain multiple updates correctly', () => {
      const modal = ModalEntity.create({})
        .withSize('lg')
        .withCloseOnEscape(false)
        .withOpen();

      expect(modal.currentState.size).toBe('lg');
      expect(modal.currentState.closeOnEscape).toBe(false);
      expect(modal.currentState.open).toBe(true);
    });
  });
});
