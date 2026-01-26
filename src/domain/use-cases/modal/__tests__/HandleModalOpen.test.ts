

import { describe, it, expect } from 'bun:test';
import { ModalEntity } from '../../../entities/modal/ModalState';
import { HandleModalOpen } from '../HandleModalOpen';

describe('HandleModalOpen', () => {
  const useCase = new HandleModalOpen();

  
  
  

  describe('Basic Opening', () => {
    it('should open closed modal successfully', async () => {
      const modal = ModalEntity.create({ open: false });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.updatedModal.currentState.open).toBe(true);
    });

    it('should set animation state to opening', async () => {
      const modal = ModalEntity.create({ open: false });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.updatedModal.currentState.animationState).toBe('opening');
    });

    it('should enable focus trap when opening', async () => {
      const modal = ModalEntity.create({ open: false, focusTrapped: false });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.updatedModal.currentState.focusTrapped).toBe(true);
    });

    it('should preserve size when opening', async () => {
      const modal = ModalEntity.create({ open: false, size: 'lg' });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.updatedModal.currentState.size).toBe('lg');
    });

    it('should preserve closeOnEscape when opening', async () => {
      const modal = ModalEntity.create({ open: false, closeOnEscape: false });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.updatedModal.currentState.closeOnEscape).toBe(false);
    });

    it('should preserve closeOnBackdropClick when opening', async () => {
      const modal = ModalEntity.create({ open: false, closeOnBackdropClick: false });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.updatedModal.currentState.closeOnBackdropClick).toBe(false);
    });
  });

  
  
  

  describe('APPLICATION RULE #1: Idempotency', () => {
    it('should return success when opening already open modal', async () => {
      const modal = ModalEntity.create({ open: true });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
    });

    it('should not change state when opening already open modal', async () => {
      const modal = ModalEntity.create({ open: true, animationState: 'open' });
      const response = await useCase.execute({ modal });

      expect(response.updatedModal).toBe(modal);
    });

    it('should not invoke callback when opening already open modal', async () => {
      const modal = ModalEntity.create({ open: true });
      let callbackInvoked = false;

      await useCase.execute({
        modal,
        onOpen: () => {
          callbackInvoked = true;
        },
      });

      expect(callbackInvoked).toBe(false);
    });
  });

  
  
  

  describe('Callback Execution', () => {
    it('should invoke onOpen callback after opening', async () => {
      const modal = ModalEntity.create({ open: false });
      let callbackInvoked = false;

      await useCase.execute({
        modal,
        onOpen: () => {
          callbackInvoked = true;
        },
      });

      expect(callbackInvoked).toBe(true);
    });

    it('should invoke async onOpen callback', async () => {
      const modal = ModalEntity.create({ open: false });
      let callbackInvoked = false;

      await useCase.execute({
        modal,
        onOpen: async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
          callbackInvoked = true;
        },
      });

      expect(callbackInvoked).toBe(true);
    });

    it('should succeed without callback', async () => {
      const modal = ModalEntity.create({ open: false });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
    });
  });

  
  
  

  describe('Error Handling', () => {
    it('should catch sync callback errors', async () => {
      const modal = ModalEntity.create({ open: false });

      const response = await useCase.execute({
        modal,
        onOpen: () => {
          throw new Error('Callback failed');
        },
      });

      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error).toBe('Callback failed');
      }
    });

    it('should catch async callback errors', async () => {
      const modal = ModalEntity.create({ open: false });

      const response = await useCase.execute({
        modal,
        onOpen: async () => {
          throw new Error('Async callback failed');
        },
      });

      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error).toBe('Async callback failed');
      }
    });

    it('should keep modal open even if callback fails', async () => {
      const modal = ModalEntity.create({ open: false });

      const response = await useCase.execute({
        modal,
        onOpen: () => {
          throw new Error('Callback failed');
        },
      });

      expect(response.updatedModal.currentState.open).toBe(true);
    });

    it('should handle non-Error throws', async () => {
      const modal = ModalEntity.create({ open: false });

      const response = await useCase.execute({
        modal,
        onOpen: () => {
          throw 'String error';
        },
      });

      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error).toBe('Unknown error during open callback');
      }
    });

    it('should handle undefined throws', async () => {
      const modal = ModalEntity.create({ open: false });

      const response = await useCase.execute({
        modal,
        onOpen: () => {
          throw undefined;
        },
      });

      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error).toBe('Unknown error during open callback');
      }
    });
  });

  
  
  

  describe('Response Types', () => {
    it('should return success response with updatedModal', async () => {
      const modal = ModalEntity.create({ open: false });
      const response = await useCase.execute({ modal });

      expect(response).toHaveProperty('success');
      expect(response).toHaveProperty('updatedModal');
      expect(response.success).toBe(true);
    });

    it('should return error response with error message', async () => {
      const modal = ModalEntity.create({ open: false });
      const response = await useCase.execute({
        modal,
        onOpen: () => {
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
