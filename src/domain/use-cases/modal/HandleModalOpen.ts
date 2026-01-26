

import { ModalEntity } from '../../entities/modal/ModalState';





export interface ModalOpenRequest {
  readonly modal: ModalEntity;
  readonly onOpen?: () => void | Promise<void>;
}

export type ModalOpenResponse =
  | {
      readonly success: true;
      readonly updatedModal: ModalEntity;
    }
  | {
      readonly success: false;
      readonly updatedModal: ModalEntity;
      readonly error: string;
    };





export class HandleModalOpen {
  
  async execute(request: ModalOpenRequest): Promise<ModalOpenResponse> {
    const { modal, onOpen } = request;

    
    if (modal.isInteractive) {
      return {
        success: true,
        updatedModal: modal,
      };
    }

    
    const openedModal = modal.withOpen();

    
    if (onOpen) {
      try {
        await onOpen();
      } catch (error) {
        
        
        return {
          success: false,
          updatedModal: openedModal,
          error: error instanceof Error ? error.message : 'Unknown error during open callback',
        };
      }
    }

    return {
      success: true,
      updatedModal: openedModal,
    };
  }
}
