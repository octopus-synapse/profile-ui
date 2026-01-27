import { LoadingStateEntity, LoadingStateVariant } from '../../entities/loading-state/LoadingStateState';

export interface TransitionLoadingStateRequest {
  currentState: LoadingStateEntity;
  targetVariant: LoadingStateVariant;
  message?: string;
}

export interface TransitionLoadingStateResponse {
  newState: LoadingStateEntity;
}

export class TransitionLoadingState {
  execute(request: TransitionLoadingStateRequest): TransitionLoadingStateResponse {
    let newState = request.currentState.withVariant(request.targetVariant);
    
    if (request.message !== undefined) {
      newState = newState.withMessage(request.message);
    }

    return { newState };
  }
}
