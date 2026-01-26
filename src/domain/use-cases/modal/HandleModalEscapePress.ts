

import { ModalEntity } from '../../entities/modal/ModalState';





export interface ModalEscapePressRequest {
  readonly modal: ModalEntity;
  readonly onClose?: () => void | Promise<void>;
}

export type ModalEscapePressResponse =
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





export class HandleModalEscapePress {
  
  async execute(request: ModalEscapePressRequest): Promise<ModalEscapePressResponse> {
    const { modal, onClose } = request;

    
    if (!modal.canDismissViaEscape) {
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
          error: error instanceof Error ? error.message : 'Unknown error during escape press callback',
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
