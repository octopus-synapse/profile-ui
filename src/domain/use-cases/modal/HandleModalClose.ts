

import { ModalEntity } from '../../entities/modal/ModalState';





export interface ModalCloseRequest {
  readonly modal: ModalEntity;
  readonly onClose?: () => void | Promise<void>;
}

export type ModalCloseResponse =
  | {
      readonly success: true;
      readonly updatedModal: ModalEntity;
    }
  | {
      readonly success: false;
      readonly updatedModal: ModalEntity;
      readonly error: string;
    };





export class HandleModalClose {
  
  async execute(request: ModalCloseRequest): Promise<ModalCloseResponse> {
    const { modal, onClose } = request;

    
    if (!modal.isInteractive) {
      return {
        success: true,
        updatedModal: modal,
      };
    }

    
    const closedModal = modal.withClosed();

    
    if (onClose) {
      try {
        await onClose();
      } catch (error) {
        
        
        return {
          success: false,
          updatedModal: closedModal,
          error: error instanceof Error ? error.message : 'Unknown error during close callback',
        };
      }
    }

    return {
      success: true,
      updatedModal: closedModal,
    };
  }
}
