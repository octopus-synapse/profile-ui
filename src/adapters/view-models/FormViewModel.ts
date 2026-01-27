

import { FormStatus, FieldValue } from '../../domain/entities/form/FormState';

export interface FormFieldViewModel {
  readonly name: string;
  readonly value: FieldValue;
  readonly error: string | null;
  readonly hasError: boolean;
  readonly touched: boolean;
  readonly dirty: boolean;
  readonly required: boolean;
}

export interface FormViewModel {
  
  readonly status: FormStatus;
  readonly isPristine: boolean;
  readonly isDirty: boolean;
  readonly isTouched: boolean;
  readonly isValid: boolean;
  readonly hasErrors: boolean;
  readonly isSubmitting: boolean;
  readonly isValidating: boolean;
  readonly isSuccess: boolean;
  readonly isError: boolean;

  
  readonly fieldCount: number;
  readonly errorCount: number;
  readonly submitAttempts: number;

  
  readonly submitError: string | null;

  
  readonly fields: ReadonlyMap<string, FormFieldViewModel>;
  readonly fieldNames: readonly string[];

  
  readonly canSubmit: boolean; 
  readonly canReset: boolean; 
}
