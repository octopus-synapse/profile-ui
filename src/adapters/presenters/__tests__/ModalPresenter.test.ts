

import { describe, it, expect } from 'bun:test';
import { ModalEntity } from '../../../domain/entities/modal/ModalState';
import { ModalPresenter } from '../ModalPresenter';
import { modalTokens } from '../../../frameworks/tokens/modal-tokens';

describe('ModalPresenter', () => {
  const presenter = new ModalPresenter();

  
  
  

  describe('Basic Presentation', () => {
    it('should present closed modal', () => {
      const entity = ModalEntity.create({ open: false });
      const viewModel = presenter.present(entity);

      expect(viewModel.open).toBe(false);
      expect(viewModel.interactive).toBe(false);
    });

    it('should present open modal', () => {
      const entity = ModalEntity.create({ open: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.open).toBe(true);
      expect(viewModel.interactive).toBe(true);
    });

    it('should present animation state', () => {
      const entity = ModalEntity.create({ open: true, animationState: 'opening' });
      const viewModel = presenter.present(entity);

      expect(viewModel.animationState).toBe('opening');
      expect(viewModel.animating).toBe(true);
    });
  });

  
  
  

  describe('Size Token Mapping', () => {
    it('should map sm size tokens', () => {
      const entity = ModalEntity.create({ size: 'sm' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.maxWidth).toBe(modalTokens.sizes.sm.maxWidth);
      expect(viewModel.styles.padding).toBe(modalTokens.sizes.sm.padding);
    });

    it('should map md size tokens', () => {
      const entity = ModalEntity.create({ size: 'md' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.maxWidth).toBe(modalTokens.sizes.md.maxWidth);
      expect(viewModel.styles.padding).toBe(modalTokens.sizes.md.padding);
    });

    it('should map lg size tokens', () => {
      const entity = ModalEntity.create({ size: 'lg' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.maxWidth).toBe(modalTokens.sizes.lg.maxWidth);
      expect(viewModel.styles.padding).toBe(modalTokens.sizes.lg.padding);
    });

    it('should map xl size tokens', () => {
      const entity = ModalEntity.create({ size: 'xl' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.maxWidth).toBe(modalTokens.sizes.xl.maxWidth);
      expect(viewModel.styles.padding).toBe(modalTokens.sizes.xl.padding);
    });

    it('should map full size tokens', () => {
      const entity = ModalEntity.create({ size: 'full' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.maxWidth).toBe(modalTokens.sizes.full.maxWidth);
      expect(viewModel.styles.padding).toBe(modalTokens.sizes.full.padding);
    });
  });

  
  
  

  describe('Style Tokens', () => {
    it('should apply content background color', () => {
      const entity = ModalEntity.create({});
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.backgroundColor).toBe(modalTokens.content.background);
    });

    it('should apply border color', () => {
      const entity = ModalEntity.create({});
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.borderColor).toBe(modalTokens.content.border);
    });

    it('should apply border radius', () => {
      const entity = ModalEntity.create({});
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.borderRadius).toBe(modalTokens.content.radius);
    });

    it('should apply overlay background', () => {
      const entity = ModalEntity.create({});
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.overlayBackground).toBe(modalTokens.overlay.background);
    });
  });

  
  
  

  describe('Behavior Flags', () => {
    it('should set shouldLockBodyScroll for open modal', () => {
      const entity = ModalEntity.create({ open: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.shouldLockBodyScroll).toBe(true);
    });

    it('should not set shouldLockBodyScroll for closed modal', () => {
      const entity = ModalEntity.create({ open: false });
      const viewModel = presenter.present(entity);

      expect(viewModel.shouldLockBodyScroll).toBe(false);
    });

    it('should set shouldTrapFocus for open modal', () => {
      const entity = ModalEntity.create({ open: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.shouldTrapFocus).toBe(true);
    });

    it('should not set shouldTrapFocus for closed modal', () => {
      const entity = ModalEntity.create({ open: false, focusTrapped: false });
      const viewModel = presenter.present(entity);

      expect(viewModel.shouldTrapFocus).toBe(false);
    });

    it('should set canDismissViaEscape when enabled', () => {
      const entity = ModalEntity.create({ open: true, closeOnEscape: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.canDismissViaEscape).toBe(true);
    });

    it('should not set canDismissViaEscape when disabled', () => {
      const entity = ModalEntity.create({ open: true, closeOnEscape: false });
      const viewModel = presenter.present(entity);

      expect(viewModel.canDismissViaEscape).toBe(false);
    });

    it('should set canDismissViaBackdrop when enabled', () => {
      const entity = ModalEntity.create({ open: true, closeOnBackdropClick: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.canDismissViaBackdrop).toBe(true);
    });

    it('should not set canDismissViaBackdrop when disabled', () => {
      const entity = ModalEntity.create({ open: true, closeOnBackdropClick: false });
      const viewModel = presenter.present(entity);

      expect(viewModel.canDismissViaBackdrop).toBe(false);
    });
  });

  
  
  

  describe('Accessibility', () => {
    it('should set ariaModal true for open modal', () => {
      const entity = ModalEntity.create({ open: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.ariaModal).toBe(true);
    });

    it('should set ariaModal false for closed modal', () => {
      const entity = ModalEntity.create({ open: false });
      const viewModel = presenter.present(entity);

      expect(viewModel.ariaModal).toBe(false);
    });

    it('should set ariaHidden false for open modal', () => {
      const entity = ModalEntity.create({ open: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.ariaHidden).toBe(false);
    });

    it('should set ariaHidden true for closed modal', () => {
      const entity = ModalEntity.create({ open: false });
      const viewModel = presenter.present(entity);

      expect(viewModel.ariaHidden).toBe(true);
    });

    it('should always set role to dialog', () => {
      const entity = ModalEntity.create({});
      const viewModel = presenter.present(entity);

      expect(viewModel.role).toBe('dialog');
    });
  });

  
  
  

  describe('Animation States', () => {
    it('should present closed animation state', () => {
      const entity = ModalEntity.create({ open: false, animationState: 'closed' });
      const viewModel = presenter.present(entity);

      expect(viewModel.animationState).toBe('closed');
      expect(viewModel.animating).toBe(false);
    });

    it('should present opening animation state', () => {
      const entity = ModalEntity.create({ open: true, animationState: 'opening' });
      const viewModel = presenter.present(entity);

      expect(viewModel.animationState).toBe('opening');
      expect(viewModel.animating).toBe(true);
    });

    it('should present open animation state', () => {
      const entity = ModalEntity.create({ open: true, animationState: 'open' });
      const viewModel = presenter.present(entity);

      expect(viewModel.animationState).toBe('open');
      expect(viewModel.animating).toBe(false);
    });

    it('should present closing animation state', () => {
      const entity = ModalEntity.create({ open: false, animationState: 'closing' });
      const viewModel = presenter.present(entity);

      expect(viewModel.animationState).toBe('closing');
      expect(viewModel.animating).toBe(true);
    });
  });
});
