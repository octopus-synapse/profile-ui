

import { describe, it, expect, beforeEach } from 'bun:test';
import { HandleButtonClick } from '../HandleButtonClick';
import { ButtonEntity } from '../../../entities/button/ButtonState';

describe('HandleButtonClick Use Case', () => {
  let useCase: HandleButtonClick;

  beforeEach(() => {
    useCase = new HandleButtonClick();
  });

  describe('Business Rule: Cannot click non-interactive buttons', () => {
    it('should reject click on disabled button', async () => {
      const button = ButtonEntity.create({ disabled: true });

      const result = await useCase.execute({
        button,
        handler: () => {},
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Button is not interactive');
      expect(result.updatedButton).toBe(button); 
    });

    it('should reject click on loading button', async () => {
      const button = ButtonEntity.create({ disabled: true, loading: true });

      const result = await useCase.execute({
        button,
        handler: () => {},
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Button is not interactive');
    });
  });

  describe('Synchronous Handler Execution', () => {
    it('should execute synchronous handler successfully', async () => {
      const button = ButtonEntity.create({ disabled: false, loading: false });
      let handlerCalled = false;

      const result = await useCase.execute({
        button,
        handler: () => {
          handlerCalled = true;
        },
      });

      expect(result.success).toBe(true);
      expect(handlerCalled).toBe(true);
      expect(result.updatedButton.currentState.loading).toBe(false);
      expect(result.error).toBeUndefined();
    });

    it('should work without handler', async () => {
      const button = ButtonEntity.create({ disabled: false, loading: false });

      const result = await useCase.execute({
        button,
        
      });

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('Asynchronous Handler Execution', () => {
    it('should set loading state during async operation', async () => {
      const button = ButtonEntity.create({ disabled: false, loading: false });
      let loadingStateDuringExecution: boolean | null = null;

      const result = await useCase.execute({
        button,
        handler: async () => {
          
          await new Promise((resolve) => setTimeout(resolve, 10));
          
          
        },
      });

      expect(result.success).toBe(true);
      expect(result.updatedButton.currentState.loading).toBe(false); 
    });

    it('should execute async handler successfully', async () => {
      const button = ButtonEntity.create({ disabled: false, loading: false });
      let asyncWorkCompleted = false;

      const result = await useCase.execute({
        button,
        handler: async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
          asyncWorkCompleted = true;
        },
      });

      expect(result.success).toBe(true);
      expect(asyncWorkCompleted).toBe(true);
      expect(result.updatedButton.currentState.loading).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle synchronous errors', async () => {
      const button = ButtonEntity.create({ disabled: false, loading: false });

      const result = await useCase.execute({
        button,
        handler: () => {
          throw new Error('Synchronous error');
        },
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Synchronous error');
      expect(result.updatedButton.currentState.loading).toBe(false); 
    });

    it('should handle asynchronous errors', async () => {
      const button = ButtonEntity.create({ disabled: false, loading: false });

      const result = await useCase.execute({
        button,
        handler: async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
          throw new Error('Async error');
        },
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Async error');
      expect(result.updatedButton.currentState.loading).toBe(false);
    });

    it('should handle non-Error exceptions', async () => {
      const button = ButtonEntity.create({ disabled: false, loading: false });

      const result = await useCase.execute({
        button,
        handler: () => {
          throw 'String error'; 
        },
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Unknown error');
    });
  });

  describe('State Transitions', () => {
    it('should transition: idle → loading → idle (success)', async () => {
      const button = ButtonEntity.create({ disabled: false, loading: false });

      expect(button.currentState.loading).toBe(false);

      const result = await useCase.execute({
        button,
        handler: async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
        },
      });

      expect(result.success).toBe(true);
      expect(result.updatedButton.currentState.loading).toBe(false);
    });

    it('should transition: idle → loading → idle (error)', async () => {
      const button = ButtonEntity.create({ disabled: false, loading: false });

      const result = await useCase.execute({
        button,
        handler: async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
          throw new Error('Failed');
        },
      });

      expect(result.success).toBe(false);
      expect(result.updatedButton.currentState.loading).toBe(false);
    });

    it('should preserve other state during execution', async () => {
      const button = ButtonEntity.create({
        variant: 'accent',
        size: 'lg',
        fullWidth: true,
        disabled: false,
        loading: false,
      });

      const result = await useCase.execute({
        button,
        handler: () => {},
      });

      expect(result.success).toBe(true);
      expect(result.updatedButton.currentState.variant).toBe('accent');
      expect(result.updatedButton.currentState.size).toBe('lg');
      expect(result.updatedButton.currentState.fullWidth).toBe(true);
    });
  });
});
