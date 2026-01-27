

import { describe, it, expect } from 'bun:test';
import { HandleSelectChange } from '../HandleSelectChange';
import { SelectEntity, type SelectOption } from '../../../entities/select/SelectState';





const createBasicOptions = (): SelectOption[] => [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];





describe('APPLICATION RULE #1: Cannot change non-interactive selects', () => {
  it('returns original select when disabled', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      disabled: true,
    });

    const response = useCase.execute({
      select,
      newValue: 'apple',
    });

    expect(response.success).toBe(true);
    expect(response.updatedSelect).toBe(select); 
    expect(response.updatedSelect.currentState.selectedValue).toBeNull();
  });

  it('allows change when enabled', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      disabled: false,
    });

    const response = useCase.execute({
      select,
      newValue: 'apple',
    });

    expect(response.success).toBe(true);
    expect(response.updatedSelect).not.toBe(select); 
    expect(response.updatedSelect.currentState.selectedValue).toBe('apple');
  });
});





describe('APPLICATION RULE #2: Value updates clear existing errors', () => {
  it('clears error when selecting value', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      error: 'Required field',
      state: 'error',
    });

    const response = useCase.execute({
      select,
      newValue: 'apple',
    });

    expect(response.success).toBe(true);
    expect(response.updatedSelect.currentState.error).toBeNull();
    expect(response.updatedSelect.currentState.state).toBe('default');
    expect(response.updatedSelect.currentState.selectedValue).toBe('apple');
  });

  it('clears error when clearing selection', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      selectedValue: 'apple',
      error: 'Some error',
      state: 'error',
    });

    const response = useCase.execute({
      select,
      newValue: null,
    });

    expect(response.success).toBe(true);
    expect(response.updatedSelect.currentState.error).toBeNull();
    expect(response.updatedSelect.currentState.selectedValue).toBeNull();
  });
});





describe('APPLICATION RULE #3: Validate if requested', () => {
  it('validates when validateOnChange is true', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });

    const response = useCase.execute({
      select,
      newValue: 'apple',
      validateOnChange: true,
    });

    expect(response.success).toBe(true);
    expect(response.validationError).toBeNull();
    expect(response.updatedSelect.currentState.selectedValue).toBe('apple');
  });

  it('skips validation when validateOnChange is false', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });

    const response = useCase.execute({
      select,
      newValue: null, 
      validateOnChange: false,
    });

    expect(response.success).toBe(true);
    expect(response.validationError).toBeUndefined();
    expect(response.updatedSelect.currentState.error).toBeNull();
  });

  it('sets error when validation fails', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
      selectedValue: 'apple',
    });

    const response = useCase.execute({
      select,
      newValue: null, 
      validateOnChange: true,
    });

    expect(response.success).toBe(true);
    expect(response.validationError).toBe('Please select an option');
    expect(response.updatedSelect.currentState.error).toBe(
      'Please select an option'
    );
    expect(response.updatedSelect.currentState.state).toBe('error');
  });

  it('returns null validation error when validation passes', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });

    const response = useCase.execute({
      select,
      newValue: 'apple',
      validateOnChange: true,
    });

    expect(response.success).toBe(true);
    expect(response.validationError).toBeNull();
    expect(response.updatedSelect.currentState.error).toBeNull();
  });
});





describe('APPLICATION RULE #4: Always return success', () => {
  it('returns success even when validation fails', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });

    const response = useCase.execute({
      select,
      newValue: null,
      validateOnChange: true,
    });

    expect(response.success).toBe(true);
    expect(response.validationError).toBe('Please select an option');
  });

  it('returns success when select is disabled', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      disabled: true,
    });

    const response = useCase.execute({
      select,
      newValue: 'apple',
    });

    expect(response.success).toBe(true);
  });

  it('returns success for valid changes', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
    });

    const response = useCase.execute({
      select,
      newValue: 'apple',
    });

    expect(response.success).toBe(true);
  });
});





describe('Integration scenarios', () => {
  it('handles selecting first option on required select', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });

    const response = useCase.execute({
      select,
      newValue: 'apple',
      validateOnChange: true,
    });

    expect(response.success).toBe(true);
    expect(response.updatedSelect.currentState.selectedValue).toBe('apple');
    expect(response.updatedSelect.hasError).toBe(false);
    expect(response.validationError).toBeNull();
  });

  it('handles changing selection', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      selectedValue: 'apple',
    });

    const response = useCase.execute({
      select,
      newValue: 'banana',
    });

    expect(response.success).toBe(true);
    expect(response.updatedSelect.currentState.selectedValue).toBe('banana');
  });

  it('handles clearing selection on optional select', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: createBasicOptions(),
      selectedValue: 'apple',
      required: false,
    });

    const response = useCase.execute({
      select,
      newValue: null,
      validateOnChange: true,
    });

    expect(response.success).toBe(true);
    expect(response.updatedSelect.currentState.selectedValue).toBeNull();
    expect(response.validationError).toBeNull();
  });

  it('handles error recovery flow', () => {
    const useCase = new HandleSelectChange();

    
    let select = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });

    
    let response = useCase.execute({
      select,
      newValue: null,
      validateOnChange: true,
    });

    expect(response.updatedSelect.hasError).toBe(true);
    select = response.updatedSelect;

    
    response = useCase.execute({
      select,
      newValue: 'apple',
      validateOnChange: true,
    });

    expect(response.updatedSelect.hasError).toBe(false);
    expect(response.updatedSelect.currentState.selectedValue).toBe('apple');
  });

  it('validates no options available scenario', () => {
    const useCase = new HandleSelectChange();
    const select = SelectEntity.create<string>({
      options: [{ value: 'disabled', label: 'Disabled', disabled: true }],
      required: true,
    });

    const response = useCase.execute({
      select,
      newValue: null,
      validateOnChange: true,
    });

    expect(response.success).toBe(true);
    expect(response.validationError).toBe('No options available to select');
  });
});





describe('Type safety with generic types', () => {
  it('handles numeric values', () => {
    const useCase = new HandleSelectChange<number>();
    const select = SelectEntity.create<number>({
      options: [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
        { value: 3, label: 'Three' },
      ],
    });

    const response = useCase.execute({
      select,
      newValue: 2,
    });

    expect(response.success).toBe(true);
    expect(response.updatedSelect.currentState.selectedValue).toBe(2);
  });

  it('handles object values', () => {
    interface Fruit {
      id: string;
      name: string;
    }

    const useCase = new HandleSelectChange<Fruit>();
    const apple: Fruit = { id: '1', name: 'Apple' };
    const banana: Fruit = { id: '2', name: 'Banana' };

    const select = SelectEntity.create<Fruit>({
      options: [
        { value: apple, label: 'Apple' },
        { value: banana, label: 'Banana' },
      ],
    });

    const response = useCase.execute({
      select,
      newValue: banana,
    });

    expect(response.success).toBe(true);
    expect(response.updatedSelect.currentState.selectedValue).toBe(banana);
  });
});
