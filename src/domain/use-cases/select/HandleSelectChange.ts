import { SelectEntity } from '../../entities/select/SelectState';
import { ValidateSelect } from './ValidateSelect';

export interface HandleSelectChangeRequest<T = string> {
  select: SelectEntity<T>;
  newValue: T | null;
  validateOnChange?: boolean;
}

export interface HandleSelectChangeResponse<T = string> {
  updatedSelect: SelectEntity<T>;
  success: boolean;
  validationError?: string | null;
}

export class HandleSelectChange<T = string> {
  execute(request: HandleSelectChangeRequest<T>): HandleSelectChangeResponse<T> {
    const { select, newValue, validateOnChange = false } = request;

    // APPLICATION RULE #1: Cannot change non-interactive selects
    if (!select.isInteractive) {
      return {
        updatedSelect: select,
        success: true,
      };
    }

    // APPLICATION RULE #2: Value updates clear existing errors
    const updatedSelect = select.withSelectedValue(newValue);

    // APPLICATION RULE #3: Validate if requested
    if (validateOnChange) {
      const validator = new ValidateSelect<T>();
      const validationResult = validator.execute({ select: updatedSelect });
      return {
        updatedSelect: validationResult.updatedSelect,
        success: true,
        validationError: validationResult.validationResult.errorMessage,
      };
    }

    // APPLICATION RULE #4: Always return success
    return {
      updatedSelect,
      success: true,
    };
  }
}
