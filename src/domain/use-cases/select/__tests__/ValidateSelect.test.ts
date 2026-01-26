

import { describe, it, expect } from 'bun:test';
import { ValidateSelect } from '../ValidateSelect';
import { SelectEntity, type SelectOption } from '../../../entities/select/SelectState';





const createBasicOptions = (): SelectOption[] => [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];





describe('APPLICATION RULE #1: Run all applicable validations', () => {
  it('runs required validation', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
      selectedValue: null,
    });

    const response = useCase.execute({ select });

    expect(response.success).toBe(true);
    expect(response.validationResult.valid).toBe(false);
    expect(response.validationResult.errorMessage).toBe(
      'Please select an option'
    );
  });

  it('runs options validation', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: [{ value: 'disabled', label: 'Disabled', disabled: true }],
      required: true,
      placeholder: 'Select',
    });

    const response = useCase.execute({ select });

    expect(response.success).toBe(true);
    expect(response.validationResult.valid).toBe(false);
    expect(response.validationResult.errorMessage).toBe(
      'No options available to select'
    );
  });

  it('returns valid when all validations pass', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
      selectedValue: 'apple',
    });

    const response = useCase.execute({ select });

    expect(response.success).toBe(true);
    expect(response.validationResult.valid).toBe(true);
    expect(response.validationResult.errorMessage).toBeNull();
  });
});





describe('APPLICATION RULE #2: If validation fails, update select with error', () => {
  it('sets error on select when validation fails', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });

    const response = useCase.execute({ select });

    expect(response.updatedSelect.currentState.error).toBe(
      'Please select an option'
    );
    expect(response.updatedSelect.currentState.state).toBe('error');
  });

  it('preserves original select (immutability)', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });

    const response = useCase.execute({ select });

    
    expect(select.currentState.error).toBeNull();
    expect(select.currentState.state).toBe('default');

    
    expect(response.updatedSelect.currentState.error).toBe(
      'Please select an option'
    );
  });
});





describe('APPLICATION RULE #3: If validation passes, clear existing errors', () => {
  it('clears error when validation passes', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
      selectedValue: 'apple',
      error: 'Old error',
      state: 'error',
    });

    const response = useCase.execute({ select });

    expect(response.updatedSelect.currentState.error).toBeNull();
    expect(response.updatedSelect.currentState.state).toBe('default');
  });

  it('maintains no error when already valid', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: false,
    });

    const response = useCase.execute({ select });

    expect(response.updatedSelect.currentState.error).toBeNull();
    expect(response.updatedSelect.currentState.state).toBe('default');
  });
});





describe('APPLICATION RULE #4: Return validation result for caller', () => {
  it('returns detailed validation result on failure', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });

    const response = useCase.execute({ select });

    expect(response.validationResult).toEqual({
      valid: false,
      errorMessage: 'Please select an option',
    });
  });

  it('returns detailed validation result on success', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
      selectedValue: 'apple',
    });

    const response = useCase.execute({ select });

    expect(response.validationResult).toEqual({
      valid: true,
      errorMessage: null,
    });
  });

  it('always returns success: true', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });

    const response = useCase.execute({ select });

    expect(response.success).toBe(true);
  });
});





describe('Integration scenarios', () => {
  it('handles optional select with no selection', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: false,
    });

    const response = useCase.execute({ select });

    expect(response.validationResult.valid).toBe(true);
    expect(response.updatedSelect.currentState.error).toBeNull();
  });

  it('handles required select with selection', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
      selectedValue: 'banana',
    });

    const response = useCase.execute({ select });

    expect(response.validationResult.valid).toBe(true);
    expect(response.updatedSelect.currentState.error).toBeNull();
  });

  it('handles required select without selection', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });

    const response = useCase.execute({ select });

    expect(response.validationResult.valid).toBe(false);
    expect(response.updatedSelect.currentState.error).toBe(
      'Please select an option'
    );
  });

  it('handles validation error recovery', () => {
    const useCase = new ValidateSelect();

    
    let select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });

    
    let response = useCase.execute({ select });
    expect(response.validationResult.valid).toBe(false);

    
    select = response.updatedSelect.withSelectedValue('apple');

    
    response = useCase.execute({ select });
    expect(response.validationResult.valid).toBe(true);
    expect(response.updatedSelect.currentState.error).toBeNull();
  });

  it('handles empty options with required', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: [],
      required: true,
      placeholder: 'No options',
    });

    const response = useCase.execute({ select });

    expect(response.validationResult.valid).toBe(false);
    expect(response.validationResult.errorMessage).toBe(
      'No options available to select'
    );
  });

  it('handles disabled options with required', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: [
        { value: 'option1', label: 'Option 1', disabled: true },
        { value: 'option2', label: 'Option 2', disabled: true },
      ],
      required: true,
    });

    const response = useCase.execute({ select });

    expect(response.validationResult.valid).toBe(false);
    expect(response.validationResult.errorMessage).toBe(
      'No options available to select'
    );
  });

  it('validates successfully with mix of enabled and disabled options', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: [
        { value: 'option1', label: 'Option 1', disabled: true },
        { value: 'option2', label: 'Option 2', disabled: false },
      ],
      required: true,
      selectedValue: 'option2',
    });

    const response = useCase.execute({ select });

    expect(response.validationResult.valid).toBe(true);
  });
});





describe('Type safety with generic types', () => {
  it('handles numeric values', () => {
    const useCase = new ValidateSelect<number>();
    const select = SelectEntity.create<number>({
      options: [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
      ],
      required: true,
      selectedValue: 1,
    });

    const response = useCase.execute({ select });

    expect(response.validationResult.valid).toBe(true);
  });

  it('handles object values', () => {
    interface Option {
      id: string;
      name: string;
    }

    const useCase = new ValidateSelect<Option>();
    const option1: Option = { id: '1', name: 'First' };

    const select = SelectEntity.create<Option>({
      options: [
        { value: option1, label: 'First' },
        { value: { id: '2', name: 'Second' }, label: 'Second' },
      ],
      required: true,
      selectedValue: option1,
    });

    const response = useCase.execute({ select });

    expect(response.validationResult.valid).toBe(true);
  });
});





describe('Edge cases', () => {
  it('handles select that is already in error state', () => {
    const useCase = new ValidateSelect();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
      selectedValue: 'apple',
      error: 'Previous error',
      state: 'error',
    });

    const response = useCase.execute({ select });

    
    expect(response.validationResult.valid).toBe(true);
    expect(response.updatedSelect.currentState.error).toBeNull();
    expect(response.updatedSelect.currentState.state).toBe('default');
  });

  it('handles revalidation after error', () => {
    const useCase = new ValidateSelect();

    
    const select1 = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });

    const response1 = useCase.execute({ select: select1 });
    expect(response1.validationResult.valid).toBe(false);

    
    const select2 = response1.updatedSelect.withSelectedValue('apple');

    
    const response2 = useCase.execute({ select: select2 });
    expect(response2.validationResult.valid).toBe(true);
    expect(response2.updatedSelect.currentState.error).toBeNull();
  });
});
