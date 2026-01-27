

import { ButtonEntity } from '../../entities/button/ButtonState';





export interface ButtonClickRequest {
  readonly button: ButtonEntity;
  readonly handler?: () => void | Promise<void>;
}

export type ButtonClickResponse =
  | {
      readonly success: true;
      readonly updatedButton: ButtonEntity;
    }
  | {
      readonly success: false;
      readonly updatedButton: ButtonEntity;
      readonly error: string;
    };





export class HandleButtonClick {
  
  async execute(request: ButtonClickRequest): Promise<ButtonClickResponse> {
    const { button, handler } = request;

    
    if (!button.isInteractive) {
      return {
        success: false,
        updatedButton: button,
        error: 'Button is not interactive',
      };
    }

    
    if (!handler) {
      return {
        success: true,
        updatedButton: button,
      };
    }

    
    button.withLoading(true);

    try {
      
      await handler();

      
      return {
        success: true,
        updatedButton: button.withLoading(false),
      };
    } catch (error) {
      
      
      return {
        success: false,
        updatedButton: button.withLoading(false),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
