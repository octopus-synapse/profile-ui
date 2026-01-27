

import { describe, it, expect } from 'bun:test';
import { ModalEntity } from '../../../entities/modal/ModalState';
import { HandleModalEscapePress } from '../HandleModalEscapePress';

describe('HandleModalEscapePress', () => {
  const useCase = new HandleModalEscapePress();

  
  
  

  describe('When Dismissal is Allowed', () => {
    it('should close modal when closeOnEscape is true', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: true });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.dismissed).toBe(true);
      expect(response.updatedModal.currentState.open).toBe(false);
    });

    it('should set animation state to closing', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: true });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.updatedModal.currentState.animationState).toBe('closing');
    });

    it('should invoke onClose callback', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: true });
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
      const modal = ModalEntity.create({ open: true, closeOnEscape: true });
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
      const modal = ModalEntity.create({ open: true, closeOnEscape: true });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.dismissed).toBe(true);
    });
  });

  
  
  

  describe('When Dismissal is Not Allowed', () => {
    it('should not close modal when closeOnEscape is false', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: false });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.dismissed).toBe(false);
      expect(response.updatedModal.currentState.open).toBe(true);
    });

    it('should not change modal state', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: false });
      const response = await useCase.execute({ modal });

      expect(response.updatedModal).toBe(modal);
    });

    it('should not invoke callback', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: false });
      let callbackInvoked = false;

      await useCase.execute({
        modal,
        onClose: () => {
          callbackInvoked = true;
        },
      });

      expect(callbackInvoked).toBe(false);
    });

    it('should return success even when not dismissed', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: false });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.dismissed).toBe(false);
    });
  });

  
  
  

  describe('When Modal is Already Closed', () => {
    it('should not dismiss closed modal even if closeOnEscape is true', async () => {
      const modal = ModalEntity.create({ open: false, closeOnEscape: true });
      const response = await useCase.execute({ modal });

      expect(response.success).toBe(true);
      expect(response.dismissed).toBe(false);
    });

    it('should not invoke callback for closed modal', async () => {
      const modal = ModalEntity.create({ open: false, closeOnEscape: true });
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

  
  
  

  describe('Error Handling', () => {
    it('should catch sync callback errors', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: true });

      const response = await useCase.execute({
        modal,
        onClose: () => {
          throw new Error('Callback failed');
        },
      });

      expect(response.success).toBe(false);
      expect(response.dismissed).toBe(true);
      if (!response.success) {
        expect(response.error).toBe('Callback failed');
      }
    });

    it('should catch async callback errors', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: true });

      const response = await useCase.execute({
        modal,
        onClose: async () => {
          throw new Error('Async callback failed');
        },
      });

      expect(response.success).toBe(false);
      expect(response.dismissed).toBe(true);
      if (!response.success) {
        expect(response.error).toBe('Async callback failed');
      }
    });

    it('should keep modal closed even if callback fails', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: true });

      const response = await useCase.execute({
        modal,
        onClose: () => {
          throw new Error('Callback failed');
        },
      });

      expect(response.updatedModal.currentState.open).toBe(false);
    });

    it('should handle non-Error throws', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: true });

      const response = await useCase.execute({
        modal,
        onClose: () => {
          throw 'String error';
        },
      });

      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error).toBe('Unknown error during escape press callback');
      }
    });

    it('should handle undefined throws', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: true });

      const response = await useCase.execute({
        modal,
        onClose: () => {
          throw undefined;
        },
      });

      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error).toBe('Unknown error during escape press callback');
      }
    });
  });

  
  
  

  describe('Configuration Preservation', () => {
    it('should preserve size when dismissing', async () => {
      const modal = ModalEntity.create({ open: true, size: 'sm', closeOnEscape: true });
      const response = await useCase.execute({ modal });

      expect(response.updatedModal.currentState.size).toBe('sm');
    });

    it('should preserve closeOnBackdropClick when dismissing', async () => {
      const modal = ModalEntity.create({ open: true, closeOnBackdropClick: false, closeOnEscape: true });
      const response = await useCase.execute({ modal });

      expect(response.updatedModal.currentState.closeOnBackdropClick).toBe(false);
    });
  });

  
  
  

  describe('Response Types', () => {
    it('should return success response with dismissed flag', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: true });
      const response = await useCase.execute({ modal });

      expect(response).toHaveProperty('success');
      expect(response).toHaveProperty('updatedModal');
      expect(response).toHaveProperty('dismissed');
      expect(response.success).toBe(true);
    });

    it('should return error response with error message', async () => {
      const modal = ModalEntity.create({ open: true, closeOnEscape: true });
      const response = await useCase.execute({
        modal,
        onClose: () => {
          throw new Error('Test error');
        },
      });

      expect(response).toHaveProperty('success');
      expect(response).toHaveProperty('updatedModal');
      expect(response).toHaveProperty('dismissed');
      expect(response).toHaveProperty('error');
      expect(response.success).toBe(false);
    });
  });
});
