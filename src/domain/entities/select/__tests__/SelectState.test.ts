

import { describe, it, expect } from 'bun:test';
import { SelectEntity, type SelectOption } from '../SelectState';





const createBasicOptions = (): SelectOption[] => [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const createOptionsWithDisabled = (): SelectOption[] => [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana', disabled: true },
  { value: 'cherry', label: 'Cherry' },
];





describe('SelectEntity.create', () => {
  it('creates entity with default values', () => {
    const entity = SelectEntity.create<string>({});

    const state = entity.currentState;
    expect(state.options).toEqual([]);
    expect(state.selectedValue).toBeNull();
    expect(state.size).toBe('md');
    expect(state.state).toBe('default');
    expect(state.disabled).toBe(false);
    expect(state.required).toBe(false);
    expect(state.error).toBeNull();
    expect(state.placeholder).toBe('Select an option');
  });

  it('creates entity with provided values', () => {
    const options = createBasicOptions();
    const entity = SelectEntity.create<string>({
      options,
      selectedValue: 'apple',
      size: 'lg',
      state: 'success',
      disabled: true,
      required: true,
      placeholder: 'Choose fruit',
    });

    const state = entity.currentState;
    expect(state.options).toEqual(options);
    expect(state.selectedValue).toBe('apple');
    expect(state.size).toBe('lg');
    expect(state.state).toBe('success');
    expect(state.disabled).toBe(true);
    expect(state.required).toBe(true);
    expect(state.placeholder).toBe('Choose fruit');
  });
});





describe('BUSINESS RULE #1: Options must have unique values', () => {
  it('throws error when options have duplicate values', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: [
          { value: 'apple', label: 'Apple' },
          { value: 'apple', label: 'Green Apple' }, 
        ],
      });
    }).toThrow('Options must have unique values');
  });

  it('allows options with same label but different values', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: [
          { value: 'apple1', label: 'Apple' },
          { value: 'apple2', label: 'Apple' }, 
        ],
      });
    }).not.toThrow();
  });
});





describe('BUSINESS RULE #2: Selected value must exist in options', () => {
  it('throws error when selectedValue does not exist in options', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: createBasicOptions(),
        selectedValue: 'orange', 
      });
    }).toThrow('Selected value must exist in options');
  });

  it('allows null selectedValue', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: createBasicOptions(),
        selectedValue: null,
      });
    }).not.toThrow();
  });

  it('allows selectedValue that exists in options', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: createBasicOptions(),
        selectedValue: 'apple',
      });
    }).not.toThrow();
  });
});





describe('BUSINESS RULE #3: Cannot select a disabled option', () => {
  it('throws error when selectedValue is a disabled option', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: createOptionsWithDisabled(),
        selectedValue: 'banana', 
      });
    }).toThrow('Cannot select a disabled option');
  });

  it('allows selecting enabled options', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: createOptionsWithDisabled(),
        selectedValue: 'apple', 
      });
    }).not.toThrow();
  });
});





describe('BUSINESS RULE #4: Disabled selects cannot have errors', () => {
  it('throws error when select is disabled and has error', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: createBasicOptions(),
        disabled: true,
        error: 'Some error',
      });
    }).toThrow('Disabled selects cannot have errors');
  });

  it('allows disabled select without error', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: createBasicOptions(),
        disabled: true,
        error: null,
      });
    }).not.toThrow();
  });

  it('allows enabled select with error', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: createBasicOptions(),
        disabled: false,
        error: 'Some error',
        state: 'error',
      });
    }).not.toThrow();
  });
});





describe('BUSINESS RULE #5: Error state must match error message', () => {
  it('throws error when error message exists but state is not error', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: createBasicOptions(),
        error: 'Some error',
        state: 'default', 
      });
    }).toThrow('Error message requires error state');
  });

  it('allows error message with error state', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: createBasicOptions(),
        error: 'Some error',
        state: 'error',
      });
    }).not.toThrow();
  });

  it('allows no error message with non-error state', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: createBasicOptions(),
        error: null,
        state: 'success',
      });
    }).not.toThrow();
  });
});





describe('BUSINESS RULE #6: Empty options require placeholder', () => {
  it('throws error when options are empty and placeholder is empty', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: [],
        placeholder: '',
      });
    }).toThrow('Empty options require placeholder text');
  });

  it('allows empty options with placeholder', () => {
    expect(() => {
      SelectEntity.create<string>({
        options: [],
        placeholder: 'No options available',
      });
    }).not.toThrow();
  });

  it('uses default placeholder when not provided', () => {
    const entity = SelectEntity.create<string>({ options: [] });
    expect(entity.currentState.placeholder).toBe('Select an option');
  });
});





describe('BUSINESS RULE #7: Interactive means not disabled', () => {
  it('returns false when disabled', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      disabled: true,
    });
    expect(entity.isInteractive).toBe(false);
  });

  it('returns true when enabled', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      disabled: false,
    });
    expect(entity.isInteractive).toBe(true);
  });
});





describe('BUSINESS RULE #8: Has error means error message or error state', () => {
  it('returns true when error message exists', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      error: 'Some error',
      state: 'error',
    });
    expect(entity.hasError).toBe(true);
  });

  it('returns true when state is error', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      state: 'error',
    });
    expect(entity.hasError).toBe(true);
  });

  it('returns false when no error', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      state: 'default',
    });
    expect(entity.hasError).toBe(false);
  });
});





describe('BUSINESS RULE #9: Has selection means selectedValue is not null', () => {
  it('returns true when selectedValue is not null', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      selectedValue: 'apple',
    });
    expect(entity.hasSelection).toBe(true);
  });

  it('returns false when selectedValue is null', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      selectedValue: null,
    });
    expect(entity.hasSelection).toBe(false);
  });
});





describe('Getters', () => {
  describe('errorMessage', () => {
    it('returns error message when set', () => {
      const entity = SelectEntity.create<string>({
        options: createBasicOptions(),
        error: 'Test error',
        state: 'error',
      });
      expect(entity.errorMessage).toBe('Test error');
    });

    it('returns null when no error', () => {
      const entity = SelectEntity.create<string>({
        options: createBasicOptions(),
      });
      expect(entity.errorMessage).toBeNull();
    });
  });

  describe('selectedOption', () => {
    it('returns selected option when value is selected', () => {
      const entity = SelectEntity.create<string>({
        options: createBasicOptions(),
        selectedValue: 'banana',
      });
      expect(entity.selectedOption).toEqual({
        value: 'banana',
        label: 'Banana',
      });
    });

    it('returns null when no value is selected', () => {
      const entity = SelectEntity.create<string>({
        options: createBasicOptions(),
      });
      expect(entity.selectedOption).toBeNull();
    });
  });

  describe('selectableOptions', () => {
    it('filters out disabled options', () => {
      const entity = SelectEntity.create<string>({
        options: createOptionsWithDisabled(),
      });
      expect(entity.selectableOptions).toEqual([
        { value: 'apple', label: 'Apple' },
        { value: 'cherry', label: 'Cherry' },
      ]);
    });

    it('returns all options when none are disabled', () => {
      const entity = SelectEntity.create<string>({
        options: createBasicOptions(),
      });
      expect(entity.selectableOptions).toEqual(createBasicOptions());
    });
  });

  describe('currentState', () => {
    it('returns defensive copy of state', () => {
      const entity = SelectEntity.create<string>({
        options: createBasicOptions(),
      });
      const state1 = entity.currentState;
      const state2 = entity.currentState;

      expect(state1).toEqual(state2);
      expect(state1).not.toBe(state2); 
    });
  });
});





describe('withSelectedValue', () => {
  it('updates selected value', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
    });
    const updated = entity.withSelectedValue('apple');

    expect(entity.currentState.selectedValue).toBeNull();
    expect(updated.currentState.selectedValue).toBe('apple');
  });

  it('clears error when selecting value', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      error: 'Required',
      state: 'error',
    });
    const updated = entity.withSelectedValue('apple');

    expect(entity.currentState.error).toBe('Required');
    expect(updated.currentState.error).toBeNull();
    expect(updated.currentState.state).toBe('default');
  });

  it('allows clearing selection with null', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      selectedValue: 'apple',
    });
    const updated = entity.withSelectedValue(null);

    expect(updated.currentState.selectedValue).toBeNull();
  });

  it('throws error when value does not exist in options', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
    });
    expect(() => {
      entity.withSelectedValue('orange' as any);
    }).toThrow('Cannot select value that does not exist in options');
  });

  it('throws error when selecting disabled option', () => {
    const entity = SelectEntity.create<string>({
      options: createOptionsWithDisabled(),
    });
    expect(() => {
      entity.withSelectedValue('banana');
    }).toThrow('Cannot select a disabled option');
  });
});





describe('withOptions', () => {
  it('updates options', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
    });
    const newOptions = [{ value: 'orange', label: 'Orange' }];
    const updated = entity.withOptions(newOptions);

    expect(entity.currentState.options).toEqual(createBasicOptions());
    expect(updated.currentState.options).toEqual(newOptions);
  });

  it('clears selection when selected value not in new options', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      selectedValue: 'apple',
    });
    const newOptions = [{ value: 'orange', label: 'Orange' }];
    const updated = entity.withOptions(newOptions);

    expect(entity.currentState.selectedValue).toBe('apple');
    expect(updated.currentState.selectedValue).toBeNull();
  });

  it('preserves selection when selected value exists in new options', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      selectedValue: 'apple',
    });
    const newOptions = [
      { value: 'apple', label: 'Apple' },
      { value: 'orange', label: 'Orange' },
    ];
    const updated = entity.withOptions(newOptions);

    expect(updated.currentState.selectedValue).toBe('apple');
  });
});





describe('withAddedOption', () => {
  it('adds new option', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
    });
    const updated = entity.withAddedOption({
      value: 'orange',
      label: 'Orange',
    });

    expect(entity.currentState.options.length).toBe(3);
    expect(updated.currentState.options.length).toBe(4);
    expect(updated.currentState.options[3]).toEqual({
      value: 'orange',
      label: 'Orange',
    });
  });

  it('throws error when adding duplicate value', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
    });
    expect(() => {
      entity.withAddedOption({ value: 'apple', label: 'Green Apple' });
    }).toThrow('Cannot add option with duplicate value');
  });
});





describe('withRemovedOption', () => {
  it('removes option', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
    });
    const updated = entity.withRemovedOption('banana');

    expect(entity.currentState.options.length).toBe(3);
    expect(updated.currentState.options.length).toBe(2);
    expect(
      updated.currentState.options.find((opt) => opt.value === 'banana')
    ).toBeUndefined();
  });

  it('clears selection when removing selected option', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      selectedValue: 'banana',
    });
    const updated = entity.withRemovedOption('banana');

    expect(entity.currentState.selectedValue).toBe('banana');
    expect(updated.currentState.selectedValue).toBeNull();
  });

  it('preserves selection when removing non-selected option', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      selectedValue: 'apple',
    });
    const updated = entity.withRemovedOption('banana');

    expect(updated.currentState.selectedValue).toBe('apple');
  });
});





describe('withError', () => {
  it('sets error and changes state to error', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
    });
    const updated = entity.withError('Required field');

    expect(updated.currentState.error).toBe('Required field');
    expect(updated.currentState.state).toBe('error');
  });

  it('clears error and resets state to default', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      error: 'Required field',
      state: 'error',
    });
    const updated = entity.withError(null);

    expect(updated.currentState.error).toBeNull();
    expect(updated.currentState.state).toBe('default');
  });
});





describe('withStateType', () => {
  it('changes state type', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
    });
    const updated = entity.withStateType('success');

    expect(updated.currentState.state).toBe('success');
  });

  it('clears error when changing to non-error state', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      error: 'Some error',
      state: 'error',
    });
    const updated = entity.withStateType('success');

    expect(updated.currentState.error).toBeNull();
    expect(updated.currentState.state).toBe('success');
  });
});





describe('withDisabled', () => {
  it('sets disabled state', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
    });
    const updated = entity.withDisabled(true);

    expect(updated.currentState.disabled).toBe(true);
  });

  it('clears error when disabling', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      error: 'Required',
      state: 'error',
    });
    const updated = entity.withDisabled(true);

    expect(updated.currentState.disabled).toBe(true);
    expect(updated.currentState.error).toBeNull();
    expect(updated.currentState.state).toBe('default');
  });

  it('preserves error when enabling', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      disabled: true,
    });
    const updated = entity.withDisabled(false);

    expect(updated.currentState.disabled).toBe(false);
  });
});





describe('Other setters', () => {
  it('withRequired updates required state', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
    });
    const updated = entity.withRequired(true);

    expect(updated.currentState.required).toBe(true);
  });

  it('withSize updates size', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
    });
    const updated = entity.withSize('lg');

    expect(updated.currentState.size).toBe('lg');
  });

  it('withPlaceholder updates placeholder', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
    });
    const updated = entity.withPlaceholder('Choose an option');

    expect(updated.currentState.placeholder).toBe('Choose an option');
  });
});





describe('BUSINESS RULE #10: Required validation', () => {
  it('fails when required and no selection', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });
    const result = entity.validateRequired();

    expect(result.valid).toBe(false);
    expect(result.errorMessage).toBe('Please select an option');
  });

  it('passes when required and has selection', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
      selectedValue: 'apple',
    });
    const result = entity.validateRequired();

    expect(result.valid).toBe(true);
    expect(result.errorMessage).toBeNull();
  });

  it('passes when not required and no selection', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: false,
    });
    const result = entity.validateRequired();

    expect(result.valid).toBe(true);
    expect(result.errorMessage).toBeNull();
  });
});





describe('BUSINESS RULE #11: Must have selectable options if required', () => {
  it('fails when required and no selectable options', () => {
    const entity = SelectEntity.create<string>({
      options: [{ value: 'disabled', label: 'Disabled', disabled: true }],
      required: true,
    });
    const result = entity.validateHasOptions();

    expect(result.valid).toBe(false);
    expect(result.errorMessage).toBe('No options available to select');
  });

  it('passes when required and has selectable options', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
    });
    const result = entity.validateHasOptions();

    expect(result.valid).toBe(true);
    expect(result.errorMessage).toBeNull();
  });

  it('passes when not required and no selectable options', () => {
    const entity = SelectEntity.create<string>({
      options: [{ value: 'disabled', label: 'Disabled', disabled: true }],
      required: false,
    });
    const result = entity.validateHasOptions();

    expect(result.valid).toBe(true);
    expect(result.errorMessage).toBeNull();
  });
});





describe('validateAll', () => {
  it('returns first validation error encountered', () => {
    const entity = SelectEntity.create<string>({
      options: [],
      required: true,
      placeholder: 'Select',
    });
    const result = entity.validateAll();

    expect(result.valid).toBe(false);
    expect(result.errorMessage).toBe('No options available to select');
  });

  it('passes when all validations pass', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      required: true,
      selectedValue: 'apple',
    });
    const result = entity.validateAll();

    expect(result.valid).toBe(true);
    expect(result.errorMessage).toBeNull();
  });

  it('checks options before required', () => {
    const entity = SelectEntity.create<string>({
      options: [{ value: 'disabled', label: 'Disabled', disabled: true }],
      required: true,
    });
    const result = entity.validateAll();

    
    expect(result.errorMessage).toBe('No options available to select');
  });
});





describe('Immutability', () => {
  it('all update methods return new instances', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      selectedValue: 'apple',
    });

    const updated1 = entity.withSelectedValue('banana');
    const updated2 = entity.withError('Error');
    const updated3 = entity.withDisabled(true);

    expect(updated1).not.toBe(entity);
    expect(updated2).not.toBe(entity);
    expect(updated3).not.toBe(entity);
  });

  it('original entity remains unchanged after updates', () => {
    const entity = SelectEntity.create<string>({
      options: createBasicOptions(),
      selectedValue: 'apple',
    });

    entity.withSelectedValue('banana');
    entity.withError('Error');
    entity.withDisabled(true);

    
    expect(entity.currentState.selectedValue).toBe('apple');
    expect(entity.currentState.error).toBeNull();
    expect(entity.currentState.disabled).toBe(false);
  });
});
