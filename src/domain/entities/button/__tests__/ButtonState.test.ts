

import { describe, it, expect } from 'bun:test';
import { ButtonEntity, type ButtonVariant, type ButtonSize } from '../ButtonState';

describe('ButtonEntity', () => {
  describe('Creation', () => {
    it('should create button with default values', () => {
      const button = ButtonEntity.create({});

      const state = button.currentState;
      expect(state.variant).toBe('primary');
      expect(state.size).toBe('md');
      expect(state.disabled).toBe(false);
      expect(state.loading).toBe(false);
      expect(state.fullWidth).toBe(false);
    });

    it('should create button with custom values', () => {
      const button = ButtonEntity.create({
        variant: 'secondary',
        size: 'lg',
        disabled: true,
        fullWidth: true,
      });

      const state = button.currentState;
      expect(state.variant).toBe('secondary');
      expect(state.size).toBe('lg');
      expect(state.disabled).toBe(true);
      expect(state.loading).toBe(false);
      expect(state.fullWidth).toBe(true);
    });
  });

  describe('Business Rules', () => {
    it('should enforce rule: loading buttons must be disabled', () => {
      expect(() => {
        ButtonEntity.create({
          loading: true,
          disabled: false, 
        });
      }).toThrow('Loading buttons must be disabled');
    });

    it('should allow loading when disabled is true', () => {
      const button = ButtonEntity.create({
        loading: true,
        disabled: true,
      });

      expect(button.currentState.loading).toBe(true);
      expect(button.currentState.disabled).toBe(true);
    });

    it('should calculate isInteractive correctly - not disabled, not loading', () => {
      const button = ButtonEntity.create({
        disabled: false,
        loading: false,
      });

      expect(button.isInteractive).toBe(true);
    });

    it('should calculate isInteractive correctly - disabled', () => {
      const button = ButtonEntity.create({
        disabled: true,
        loading: false,
      });

      expect(button.isInteractive).toBe(false);
    });

    it('should calculate isInteractive correctly - loading', () => {
      const button = ButtonEntity.create({
        disabled: true,
        loading: true,
      });

      expect(button.isInteractive).toBe(false);
    });
  });

  describe('Immutability', () => {
    it('should return new instance when setting loading', () => {
      const button = ButtonEntity.create({ loading: false });
      const updated = button.withLoading(true);

      expect(updated).not.toBe(button);
      expect(button.currentState.loading).toBe(false);
      expect(updated.currentState.loading).toBe(true);
    });

    it('should return new instance when setting disabled', () => {
      const button = ButtonEntity.create({ disabled: false });
      const updated = button.withDisabled(true);

      expect(updated).not.toBe(button);
      expect(button.currentState.disabled).toBe(false);
      expect(updated.currentState.disabled).toBe(true);
    });

    it('should auto-disable when setting loading to true', () => {
      const button = ButtonEntity.create({ disabled: false, loading: false });
      const updated = button.withLoading(true);

      expect(updated.currentState.loading).toBe(true);
      expect(updated.currentState.disabled).toBe(true);
    });

    it('should auto-clear loading when setting disabled to false', () => {
      const button = ButtonEntity.create({ disabled: true, loading: true });
      const updated = button.withDisabled(false);

      expect(updated.currentState.disabled).toBe(false);
      expect(updated.currentState.loading).toBe(false);
    });
  });

  describe('Variant Validation', () => {
    const validVariants: ButtonVariant[] = [
      'primary',
      'secondary',
      'accent',
      'ghost',
      'danger',
      'outline',
    ];

    validVariants.forEach((variant) => {
      it(`should accept valid variant: ${variant}`, () => {
        const button = ButtonEntity.create({ variant });
        expect(button.currentState.variant).toBe(variant);
      });
    });
  });

  describe('Size Validation', () => {
    const validSizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    validSizes.forEach((size) => {
      it(`should accept valid size: ${size}`, () => {
        const button = ButtonEntity.create({ size });
        expect(button.currentState.size).toBe(size);
      });
    });
  });

  describe('State Snapshots', () => {
    it('should return immutable state snapshot', () => {
      const button = ButtonEntity.create({ variant: 'primary' });
      const state1 = button.currentState;
      const state2 = button.currentState;

      expect(state1).not.toBe(state2); 
      expect(state1).toEqual(state2); 
    });
  });
});
