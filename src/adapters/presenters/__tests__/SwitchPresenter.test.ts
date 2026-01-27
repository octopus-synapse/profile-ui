

import { describe, it, expect } from 'bun:test';
import { SwitchEntity } from '../../../domain/entities/switch/SwitchState';
import { SwitchPresenter } from '../SwitchPresenter';
import { switchTokens } from '../../../frameworks/tokens/switch-tokens';

describe('SwitchPresenter', () => {
  
  
  

  describe('State mapping', () => {
    it('should map switch off state', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ value: false });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.on).toBe(false);
      expect(viewModel.off).toBe(true);
    });

    it('should map switch on state', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ value: true });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.on).toBe(true);
      expect(viewModel.off).toBe(false);
    });

    it('should map disabled state', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ disabled: true });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.disabled).toBe(true);
    });

    it('should map readonly state', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ readonly: true });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.readonly).toBe(true);
    });

    it('should map interactive state (not disabled, not readonly)', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ disabled: false, readonly: false });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.interactive).toBe(true);
    });

    it('should map non-interactive state (disabled)', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ disabled: true });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.interactive).toBe(false);
    });
  });

  
  
  

  describe('Style computation - default variant', () => {
    it('should compute styles for switch off', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ value: false, variant: 'default' });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.styles.width).toBe(switchTokens.width);
      expect(viewModel.styles.height).toBe(switchTokens.height);
      expect(viewModel.styles.thumbSize).toBe(switchTokens.thumbSize);
      expect(viewModel.styles.thumbTranslate).toBe(switchTokens.thumbTranslate.off);
      expect(viewModel.styles.backgroundColor).toBe(
        switchTokens.variants.default.off.background
      );
      expect(viewModel.styles.borderColor).toBe(
        switchTokens.variants.default.off.border
      );
      expect(viewModel.styles.thumbColor).toBe(
        switchTokens.variants.default.off.thumb
      );
    });

    it('should compute styles for switch on', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ value: true, variant: 'default' });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.styles.thumbTranslate).toBe(switchTokens.thumbTranslate.on);
      expect(viewModel.styles.backgroundColor).toBe(
        switchTokens.variants.default.on.background
      );
      expect(viewModel.styles.borderColor).toBe(
        switchTokens.variants.default.on.border
      );
      expect(viewModel.styles.thumbColor).toBe(
        switchTokens.variants.default.on.thumb
      );
    });
  });

  
  
  

  describe('Style computation - error variant', () => {
    it('should compute styles for error variant off', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ value: false, variant: 'error' });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.styles.backgroundColor).toBe(
        switchTokens.variants.error.off.background
      );
      expect(viewModel.styles.borderColor).toBe(
        switchTokens.variants.error.off.border
      );
      expect(viewModel.styles.thumbColor).toBe(
        switchTokens.variants.error.off.thumb
      );
    });

    it('should compute styles for error variant on', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ value: true, variant: 'error' });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.styles.backgroundColor).toBe(
        switchTokens.variants.error.on.background
      );
      expect(viewModel.styles.borderColor).toBe(
        switchTokens.variants.error.on.border
      );
      expect(viewModel.styles.thumbColor).toBe(
        switchTokens.variants.error.on.thumb
      );
    });
  });

  
  
  

  describe('Accessibility attributes', () => {
    it('should set ariaChecked to true when switch is on', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ value: true });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.ariaChecked).toBe(true);
    });

    it('should set ariaChecked to false when switch is off', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ value: false });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.ariaChecked).toBe(false);
    });

    it('should set ariaDisabled when switch is disabled', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ disabled: true });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.ariaDisabled).toBe(true);
    });

    it('should set ariaReadonly when switch is readonly', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ readonly: true });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.ariaReadonly).toBe(true);
    });

    it('should always set role to "switch"', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create();

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.role).toBe('switch');
    });
  });

  
  
  

  describe('Edge cases', () => {
    it('should handle all properties together', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({
        value: true,
        variant: 'error',
        disabled: false,
        readonly: false,
      });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.on).toBe(true);
      expect(viewModel.off).toBe(false);
      expect(viewModel.disabled).toBe(false);
      expect(viewModel.readonly).toBe(false);
      expect(viewModel.interactive).toBe(true);

      
      expect(viewModel.styles.backgroundColor).toBe(
        switchTokens.variants.error.on.background
      );
      expect(viewModel.styles.thumbTranslate).toBe(switchTokens.thumbTranslate.on);

      
      expect(viewModel.ariaChecked).toBe(true);
      expect(viewModel.ariaDisabled).toBe(false);
      expect(viewModel.ariaReadonly).toBe(false);
      expect(viewModel.role).toBe('switch');
    });

    it('should handle disabled switch on', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ value: true, disabled: true });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.on).toBe(true);
      expect(viewModel.disabled).toBe(true);
      expect(viewModel.interactive).toBe(false);
      expect(viewModel.ariaChecked).toBe(true);
      expect(viewModel.ariaDisabled).toBe(true);
    });

    it('should handle readonly switch off', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ value: false, readonly: true });

      
      const viewModel = presenter.present(entity);

      
      expect(viewModel.off).toBe(true);
      expect(viewModel.readonly).toBe(true);
      expect(viewModel.interactive).toBe(false);
      expect(viewModel.ariaChecked).toBe(false);
      expect(viewModel.ariaReadonly).toBe(true);
    });
  });

  
  
  

  describe('Immutability', () => {
    it('should not mutate entity when presenting', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create({ value: false });
      const originalState = entity.currentState;

      
      presenter.present(entity);

      
      expect(entity.currentState).toEqual(originalState);
    });

    it('should return new view model object on each call', () => {
      
      const presenter = new SwitchPresenter();
      const entity = SwitchEntity.create();

      
      const viewModel1 = presenter.present(entity);
      const viewModel2 = presenter.present(entity);

      
      expect(viewModel1).not.toBe(viewModel2); 
      expect(viewModel1).toEqual(viewModel2); 
    });
  });
});
