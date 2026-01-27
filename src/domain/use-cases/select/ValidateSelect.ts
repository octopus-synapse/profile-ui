

import {
  SelectEntity,
} from '../../entities/select/SelectState';





export interface ValidateSelectRequest<T = string> {
  readonly select: SelectEntity<T>;
}

export interface ValidateSelectResponse<T = string> {
  readonly success: true;
  readonly updatedSelect: SelectEntity<T>;
  readonly validationResult: {
    readonly valid: boolean;
    readonly errorMessage: string | null;
  };
}





export class ValidateSelect<T = string> {
  execute(request: ValidateSelectRequest<T>): ValidateSelectResponse<T> {
    const { select } = request;

    // APPLICATION RULE #1: Run all applicable validations
    const validationResult = select.validateAll();

    // APPLICATION RULE #2: If validation fails, update select with error
    // APPLICATION RULE #3: If validation passes, clear existing errors
    const updatedSelect = validationResult.valid
      ? select.withError(null)
      : select.withError(validationResult.errorMessage!);

    return {
      success: true,
      updatedSelect,
      validationResult,
    };
  }
}
