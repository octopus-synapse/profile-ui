

import { describe, it, expect } from 'bun:test';
import { ModalEntity } from '../../../entities/modal/ModalState';
import { HandleModalClose } from '../HandleModalClose';

describe('HandleModalClose', () => {
  const useCase = new HandleModalClose();

  
  
  

  describe('Basic Closing', () => {
    it('should close open modal successfully', async () => {
      const modal = ModalEntity.create({ open: true });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.updatedModal.currentState.open).toBe(false);
    });

    it('should set animation state to closing', async () => {
      const modal = ModalEntity.create({ open: true });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.updatedModal.currentState.animationState).toBe('closing');
    });

    it('should preserve size when closing', async () => {
      const modal = ModalEntity.create({ open: true, size: 'xl' });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.updatedModal.currentState.size).toBe('xl');
    });

    it('should preserve closeOnEscape when closing', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: false });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.updatedModal.currentState.closeOnEscape).toBe(false);
    });

    it('should preserve closeOnBackdropClick when closing', async () => {
      const modal = ModalEntity.create({ open: true, closeOnBackdropClick: false });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.updatedModal.currentState.closeOnBackdropClick).toBe(false);
    });

    it('should preserve focusTrapped setting when closing', async () => {
      const modal = ModalEntity.create({ open: true });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.updatedModal.currentState.focusTrapped).toBe(true);
    });
  });

  
  
  

  describe('APPLICATION RULE #1: Idempotency', () => {
    it('should return success when closing already closed modal', async () => {
      const modal = ModalEntity.create({ open: false });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
    });

    it('should not change state when closing already closed modal', async () => {
      const modal = ModalEntity.create({ open: false });
      const response = await useCase.execute({ modal });

      expect(response.updatedModal).toBe(modal);
    });

    it('should not invoke callback when closing already closed modal', async () => {
      const modal = ModalEntity.create({ open: false });
      let callbackInvoked = false;

      await useCase.execute({
        modal,
        onClose: () => {
          callbackInvoked = true;
        },
      });

      expect(callbackInvoked).toBe(false);
    });
  });

  
  
  

  describe('Callback Execution', () => {
    it('should invoke onClose callback after closing', async () => {
      const modal = ModalEntity.create({ open: true });
      let callbackInvoked = false;

      await useCase.execute({
        modal,
        onClose: () => {
          callbackInvoked = true;
        },
      });

      expect(callbackInvoked).toBe(true);
    });

    it('should invoke async onClose callback', async () => {
      const modal = ModalEntity.create({ open: true });
      let callbackInvoked = false;

      await useCase.execute({
        modal,
        onClose: async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
          callbackInvoked = true;
        },
      });

      expect(callbackInvoked).toBe(true);
    });

    it('should succeed without callback', async () => {
      const modal = ModalEntity.create({ open: true });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
    });
  });

  
  
  

  describe('Error Handling', () => {
    it('should catch sync callback errors', async () => {
      const modal = ModalEntity.create({ open: true });

      const response = await useCase.execute({
        modal,
        onClose: () => {
          throw new Error('Callback failed');
        },
      });

      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error).toBe('Callback failed');
      }
    });

    it('should catch async callback errors', async () => {
      const modal = ModalEntity.create({ open: true });

      const response = await useCase.execute({
        modal,
        onClose: async () => {
          throw new Error('Async callback failed');
        },
      });

      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error).toBe('Async callback failed');
      }
    });

    it('should keep modal closed even if callback fails', async () => {
      const modal = ModalEntity.create({ open: true });

      const response = await useCase.execute({
        modal,
        onClose: () => {
          throw new Error('Callback failed');
        },
      });

      expect(response.updatedModal.currentState.open).toBe(false);
    });

    it('should handle non-Error throws', async () => {
      const modal = ModalEntity.create({ open: true });

      const response = await useCase.execute({
        modal,
        onClose: () => {
          throw 'String error';
        },
      });

      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error).toBe('Unknown error during close callback');
      }
    });

    it('should handle undefined throws', async () => {
      const modal = ModalEntity.create({ open: true });

      const response = await useCase.execute({
        modal,
        onClose: () => {
          throw undefined;
        },
      });

      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error).toBe('Unknown error during close callback');
      }
    });
  });

  
  
  

  describe('Response Types', () => {
    it('should return success response with updatedModal', async () => {
      const modal = ModalEntity.create({ open: true });
      const response = await useCase.execute({ modal });

      expect(response).toHaveProperty('success');
      expect(response).toHaveProperty('updatedModal');
      expect(response.success).toBe(true);
    });

    it('should return error response with error message', async () => {
      const modal = ModalEntity.create({ open: true });
      const response = await useCase.execute({
        modal,
        onClose: () => {
          throw new Error('Test error');
        },
      });

      expect(response).toHaveProperty('success');
      expect(response).toHaveProperty('updatedModal');
      expect(response).toHaveProperty('error');
      expect(response.success).toBe(false);
    });
  });
});
