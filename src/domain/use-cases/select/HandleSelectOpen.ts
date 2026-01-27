import { SelectEntity } from '../../entities/select/SelectState';

export interface HandleSelectOpenRequest {
  select: SelectEntity;
}

export interface HandleSelectOpenResponse {
  updatedSelect: SelectEntity;
  success: boolean;
}

export class HandleSelectOpen {
  execute(request: HandleSelectOpenRequest): HandleSelectOpenResponse {
    if (!request.select.isInteractive) {
      return { updatedSelect: request.select, success: false };
    }
    return {
      updatedSelect: request.select.withOpen(!request.select.currentState.open),
      success: true,
    };
  }
}
