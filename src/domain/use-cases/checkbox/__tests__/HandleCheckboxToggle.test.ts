

import { describe, it, expect, mock } from 'bun:test';
import { HandleCheckboxToggle } from '../HandleCheckboxToggle';
import { CheckboxEntity } from '../../../entities/checkbox/CheckboxState';





describe('HandleCheckboxToggle - basic toggle', () => {
  it('should toggle checkbox from false to true', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });

    const result = await useCase.execute({ checkbox });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.newValue).toBe(true);
      expect(result.oldValue).toBe(false);
      expect(result.updatedCheckbox.currentState.value).toBe(true);
    }
  });

  it('should toggle checkbox from true to false', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: true });

    const result = await useCase.execute({ checkbox });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.newValue).toBe(false);
      expect(result.oldValue).toBe(true);
      expect(result.updatedCheckbox.currentState.value).toBe(false);
    }
  });

  it('should toggle checkbox from indeterminate to true', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: 'indeterminate' });

    const result = await useCase.execute({ checkbox });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.newValue).toBe(true);
      expect(result.oldValue).toBe('indeterminate');
      expect(result.updatedCheckbox.currentState.value).toBe(true);
    }
  });

  it('should preserve other checkbox state when toggling', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({
      value: false,
      variant: 'error',
      required: true,
    });

    const result = await useCase.execute({ checkbox });

    expect(result.success).toBe(true);
    if (result.success) {
      const state = result.updatedCheckbox.currentState;
      expect(state.variant).toBe('error');
      expect(state.required).toBe(true);
    }
  });
});





describe('HandleCheckboxToggle - explicit value', () => {
  it('should set checkbox to true when newValue=true', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });

    const result = await useCase.execute({ checkbox, newValue: true });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.newValue).toBe(true);
      expect(result.oldValue).toBe(false);
      expect(result.updatedCheckbox.currentState.value).toBe(true);
    }
  });

  it('should set checkbox to false when newValue=false', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: true });

    const result = await useCase.execute({ checkbox, newValue: false });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.newValue).toBe(false);
      expect(result.oldValue).toBe(true);
      expect(result.updatedCheckbox.currentState.value).toBe(false);
    }
  });

  it('should set checkbox to indeterminate when newValue=indeterminate', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });

    const result = await useCase.execute({
      checkbox,
      newValue: 'indeterminate',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.newValue).toBe('indeterminate');
      expect(result.oldValue).toBe(false);
      expect(result.updatedCheckbox.currentState.value).toBe('indeterminate');
    }
  });

  it('should use newValue even if it matches current value', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: true });

    const result = await useCase.execute({ checkbox, newValue: true });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.newValue).toBe(true);
      expect(result.oldValue).toBe(true);
      expect(result.updatedCheckbox.currentState.value).toBe(true);
    }
  });
});





describe('HandleCheckboxToggle - disabled checkbox', () => {
  it('should reject toggle when checkbox is disabled', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false, disabled: true });

    const result = await useCase.execute({ checkbox });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('not interactive');
      expect(result.updatedCheckbox.currentState.value).toBe(false);
    }
  });

  it('should reject explicit value when checkbox is disabled', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false, disabled: true });

    const result = await useCase.execute({ checkbox, newValue: true });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('not interactive');
    }
  });

  it('should not call onChange when checkbox is disabled', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false, disabled: true });
    const onChange = mock(() => {});

    const result = await useCase.execute({ checkbox, onChange });

    expect(result.success).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('HandleCheckboxToggle - readonly checkbox', () => {
  it('should reject toggle when checkbox is readonly', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false, readonly: true });

    const result = await useCase.execute({ checkbox });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('not interactive');
      expect(result.updatedCheckbox.currentState.value).toBe(false);
    }
  });

  it('should reject explicit value when checkbox is readonly', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false, readonly: true });

    const result = await useCase.execute({ checkbox, newValue: true });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('not interactive');
    }
  });

  it('should not call onChange when checkbox is readonly', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false, readonly: true });
    const onChange = mock(() => {});

    const result = await useCase.execute({ checkbox, onChange });

    expect(result.success).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });
});





describe('HandleCheckboxToggle - onChange handler', () => {
  it('should call onChange with new value when toggling', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });
    const onChange = mock((value) => {});

    await useCase.execute({ checkbox, onChange });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('should call onChange with explicit newValue', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });
    const onChange = mock((value) => {});

    await useCase.execute({ checkbox, newValue: 'indeterminate', onChange });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('indeterminate');
  });

  it('should handle async onChange handler', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });
    let handlerCompleted = false;
    const onChange = mock(async (value) => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      handlerCompleted = true;
    });

    const result = await useCase.execute({ checkbox, onChange });

    expect(result.success).toBe(true);
    expect(handlerCompleted).toBe(true);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should succeed without onChange handler', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });

    const result = await useCase.execute({ checkbox });

    expect(result.success).toBe(true);
  });
});





describe('HandleCheckboxToggle - error handling', () => {
  it('should handle synchronous onChange error', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });
    const onChange = mock(() => {
      throw new Error('Handler failed');
    });

    const result = await useCase.execute({ checkbox, onChange });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('Handler failed');
      expect(result.updatedCheckbox.currentState.value).toBe(false); 
    }
  });

  it('should handle asynchronous onChange error', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });
    const onChange = mock(async () => {
      throw new Error('Async handler failed');
    });

    const result = await useCase.execute({ checkbox, onChange });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('Async handler failed');
      expect(result.updatedCheckbox.currentState.value).toBe(false); 
    }
  });

  it('should revert to old value on onChange error', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });
    const onChange = mock(() => {
      throw new Error('Validation failed');
    });

    const result = await useCase.execute({ checkbox, onChange });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.updatedCheckbox.currentState.value).toBe(false);
    }
  });

  it('should handle non-Error thrown from onChange', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });
    const onChange = mock(() => {
      throw 'string error';
    });

    const result = await useCase.execute({ checkbox, onChange });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('onChange handler failed');
    }
  });

  it('should preserve checkbox state on onChange error', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({
      value: false,
      variant: 'error',
      required: true,
    });
    const onChange = mock(() => {
      throw new Error('Failed');
    });

    const result = await useCase.execute({ checkbox, onChange });

    expect(result.success).toBe(false);
    if (!result.success) {
      const state = result.updatedCheckbox.currentState;
      expect(state.value).toBe(false);
      expect(state.variant).toBe('error');
      expect(state.required).toBe(true);
    }
  });
});





describe('HandleCheckboxToggle - edge cases', () => {
  it('should handle rapid consecutive toggles', async () => {
    const useCase = new HandleCheckboxToggle();
    let checkbox = CheckboxEntity.create({ value: false });

    const result1 = await useCase.execute({ checkbox });
    expect(result1.success).toBe(true);
    if (result1.success) {
      checkbox = result1.updatedCheckbox;
    }

    const result2 = await useCase.execute({ checkbox });
    expect(result2.success).toBe(true);
    if (result2.success) {
      checkbox = result2.updatedCheckbox;
    }

    const result3 = await useCase.execute({ checkbox });
    expect(result3.success).toBe(true);
    if (result3.success) {
      expect(result3.updatedCheckbox.currentState.value).toBe(true);
    }
  });

  it('should handle toggle with onChange that modifies external state', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });
    let externalState = 0;
    const onChange = mock(async (value) => {
      externalState = value ? 1 : 0;
    });

    const result = await useCase.execute({ checkbox, onChange });

    expect(result.success).toBe(true);
    expect(externalState).toBe(1);
  });

  it('should handle onChange that takes significant time', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });
    const onChange = mock(async (value) => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    const startTime = Date.now();
    const result = await useCase.execute({ checkbox, onChange });
    const elapsed = Date.now() - startTime;

    expect(result.success).toBe(true);
    expect(elapsed).toBeGreaterThanOrEqual(50);
  });

  it('should maintain original checkbox reference on error', async () => {
    const useCase = new HandleCheckboxToggle();
    const checkbox = CheckboxEntity.create({ value: false });
    const onChange = mock(() => {
      throw new Error('Failed');
    });

    const result = await useCase.execute({ checkbox, onChange });

    expect(result.success).toBe(false);
    if (!result.success) {
      
      expect(result.updatedCheckbox.currentState.value).toBe(
        checkbox.currentState.value
      );
    }
  });
});
