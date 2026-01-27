

import { describe, it, expect } from 'bun:test';
import { ButtonPresenter } from '../ButtonPresenter';
import { ButtonEntity } from '../../../domain/entities/button/ButtonState';

describe('ButtonPresenter', () => {
  const presenter = new ButtonPresenter();

  describe('State Conversion', () => {
    it('should convert entity state to view model', () => {
      const entity = ButtonEntity.create({
        variant: 'primary',
        size: 'md',
        disabled: false,
        loading: false,
        fullWidth: false,
      });

      const viewModel = presenter.present(entity);

      expect(viewModel.disabled).toBe(false);
      expect(viewModel.loading).toBe(false);
      expect(viewModel.interactive).toBe(true);
      expect(viewModel.fullWidth).toBe(false);
    });

    it('should convert disabled state correctly', () => {
      const entity = ButtonEntity.create({ disabled: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.disabled).toBe(true);
      expect(viewModel.interactive).toBe(false);
    });

    it('should convert loading state correctly', () => {
      const entity = ButtonEntity.create({ disabled: true, loading: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.loading).toBe(true);
      expect(viewModel.interactive).toBe(false);
    });
  });

  describe('Style Calculation', () => {
    it('should apply primary variant styles', () => {
      const entity = ButtonEntity.create({ variant: 'primary', size: 'md' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.backgroundColor).toBe('#ffffff');
      expect(viewModel.styles.textColor).toBe('#000000');
      expect(viewModel.styles.borderColor).toBe('#ffffff');
    });

    it('should apply secondary variant styles', () => {
      const entity = ButtonEntity.create({ variant: 'secondary', size: 'md' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.backgroundColor).toBe('transparent');
      expect(viewModel.styles.textColor).toBe('#ffffff');
    });

    it('should apply accent variant styles', () => {
      const entity = ButtonEntity.create({ variant: 'accent', size: 'md' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.backgroundColor).toBe('#06b6d4');
      expect(viewModel.styles.textColor).toBe('#000000');
    });

    it('should apply danger variant styles', () => {
      const entity = ButtonEntity.create({ variant: 'danger', size: 'md' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.backgroundColor).toBe('#ef4444');
      expect(viewModel.styles.textColor).toBe('#ffffff');
    });
  });

  describe('Size Calculation', () => {
    it('should apply xs size styles', () => {
      const entity = ButtonEntity.create({ size: 'xs' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.height).toBe('28px');
      expect(viewModel.styles.paddingH).toBe('10px');
      expect(viewModel.styles.fontSize).toBe('12px');
      expect(viewModel.styles.borderRadius).toBe('8px');
    });

    it('should apply sm size styles', () => {
      const entity = ButtonEntity.create({ size: 'sm' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.height).toBe('32px');
      expect(viewModel.styles.paddingH).toBe('12px');
    });

    it('should apply md size styles', () => {
      const entity = ButtonEntity.create({ size: 'md' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.height).toBe('40px');
      expect(viewModel.styles.paddingH).toBe('16px');
    });

    it('should apply lg size styles', () => {
      const entity = ButtonEntity.create({ size: 'lg' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.height).toBe('44px');
      expect(viewModel.styles.paddingH).toBe('20px');
    });

    it('should apply xl size styles', () => {
      const entity = ButtonEntity.create({ size: 'xl' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.height).toBe('48px');
      expect(viewModel.styles.paddingH).toBe('24px');
    });
  });

  describe('Accessibility Attributes', () => {
    it('should set ariaDisabled when disabled', () => {
      const entity = ButtonEntity.create({ disabled: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.ariaDisabled).toBe(true);
    });

    it('should set ariaDisabled when loading', () => {
      const entity = ButtonEntity.create({ disabled: true, loading: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.ariaDisabled).toBe(true);
    });

    it('should set ariaLabel when loading', () => {
      const entity = ButtonEntity.create({ disabled: true, loading: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.ariaLabel).toBe('Loading');
    });

    it('should not set ariaLabel when not loading', () => {
      const entity = ButtonEntity.create({ disabled: false, loading: false });
      const viewModel = presenter.present(entity);

      expect(viewModel.ariaLabel).toBeUndefined();
    });

    it('should always set role to button', () => {
      const entity = ButtonEntity.create({});
      const viewModel = presenter.present(entity);

      expect(viewModel.role).toBe('button');
    });
  });

  describe('Edge Cases', () => {
    it('should handle all variant combinations with all sizes', () => {
      const variants = ['primary', 'secondary', 'accent', 'ghost', 'danger', 'outline'] as const;
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      variants.forEach((variant) => {
        sizes.forEach((size) => {
          const entity = ButtonEntity.create({ variant, size });
          const viewModel = presenter.present(entity);

          expect(viewModel.styles.backgroundColor).toBeDefined();
          expect(viewModel.styles.textColor).toBeDefined();
          expect(viewModel.styles.height).toBeDefined();
        });
      });
    });
  });
});
