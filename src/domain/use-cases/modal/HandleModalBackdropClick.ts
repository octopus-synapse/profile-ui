

import { ModalEntity } from '../../entities/modal/ModalState';





export interface ModalBackdropClickRequest {
  readonly modal: ModalEntity;
  readonly onClose?: () => void | Promise<void>;
}

export type ModalBackdropClickResponse =
  | {
      readonly success: true;
      readonly updatedModal: ModalEntity;
      readonly dismissed: boolean;
    }
  | {
      readonly success: false;
      readonly updatedModal: ModalEntity;
      readonly dismissed: boolean;
      readonly error: string;
    };





export class HandleModalBackdropClick {
  
  async execute(request: ModalBackdropClickRequest): Promise<ModalBackdropClickResponse> {
    const { modal, onClose } = request;

    
    if (!modal.canDismissViaBackdrop) {
      return {
        success: true,
        updatedModal: modal,
        dismissed: false,
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
          dismissed: true,
          error: error instanceof Error ? error.message : 'Unknown error during backdrop click callback',
        };
      }
    }

    return {
      success: true,
      updatedModal: closedModal,
      dismissed: true,
    };
  }
}
