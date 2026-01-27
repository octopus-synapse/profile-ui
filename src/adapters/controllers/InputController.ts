

import {
  InputEntity,
  InputState,
  InputType,
  InputSize,
  InputStateType,
} from '../../domain/entities/input/InputState';
import { HandleInputChange } from '../../domain/use-cases/input/HandleInputChange';
import { ValidateInput } from '../../domain/use-cases/input/ValidateInput';
import { InputPresenter } from '../presenters/InputPresenter';
import { InputViewModel } from '../view-models/InputViewModel';

export class InputController {
  private entity: InputEntity;
  private readonly handleChangeUseCase: HandleInputChange;
  private readonly validateUseCase: ValidateInput;
  private readonly presenter: InputPresenter;

  constructor(initialState: Partial<InputState>) {
    // BUSINESS RULE: Error message requires error state
    const state = {
      ...initialState,
      state: initialState.error ? 'error' : initialState.state,
    };
    this.entity = InputEntity.create(state);

    
    this.handleChangeUseCase = new HandleInputChange();
    this.validateUseCase = new ValidateInput();

    
    this.presenter = new InputPresenter();
  }

  
  getViewModel(): InputViewModel {
    return this.presenter.present(this.entity);
  }

  
  onChange(value: string, validateOnChange = false): void {
    const response = this.handleChangeUseCase.execute({
      input: this.entity,
      newValue: value,
      validateOnChange,
    });

    
    this.entity = response.updatedInput;
  }

  
  onBlur(): void {
    const response = this.validateUseCase.execute({
      input: this.entity,
    });

    
    this.entity = response.updatedInput;
  }

  
  validate(): boolean {
    const response = this.validateUseCase.execute({
      input: this.entity,
    });

    
    this.entity = response.updatedInput;

    return response.validationResult.valid;
  }

  
  getValue(): string {
    return this.entity.currentState.value;
  }

  
  setValue(value: string): void {
    this.entity = this.entity.withValue(value);
  }

  
  setError(error: string | null): void {
    this.entity = this.entity.withError(error);
  }

  
  clearError(): void {
    this.entity = this.entity.withError(null);
  }

  
  setDisabled(disabled: boolean): void {
    this.entity = this.entity.withDisabled(disabled);
  }

  
  setReadOnly(readOnly: boolean): void {
    this.entity = this.entity.withReadOnly(readOnly);
  }

  
  setRequired(required: boolean): void {
    this.entity = this.entity.withRequired(required);
  }

  
  setType(type: InputType): void {
    this.entity = this.entity.withType(type);
  }

  
  setSize(size: InputSize): void {
    this.entity = this.entity.withSize(size);
  }

  
  setStateType(stateType: InputStateType): void {
    this.entity = this.entity.withStateType(stateType);
  }

  
  isInteractive(): boolean {
    return this.entity.isInteractive;
  }

  
  hasError(): boolean {
    return this.entity.hasError;
  }
}
