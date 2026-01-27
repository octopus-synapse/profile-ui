

import {
  TextareaEntity,
  TextareaState,
  TextareaSize,
  TextareaStateType,
} from '../../domain/entities/textarea/TextareaState';
import { HandleTextareaChange } from '../../domain/use-cases/textarea/HandleTextareaChange';
import { ValidateTextarea } from '../../domain/use-cases/textarea/ValidateTextarea';
import { TextareaPresenter } from '../presenters/TextareaPresenter';
import { TextareaViewModel } from '../view-models/TextareaViewModel';

export class TextareaController {
  private entity: TextareaEntity;
  private readonly handleChangeUseCase: HandleTextareaChange;
  private readonly validateUseCase: ValidateTextarea;
  private readonly presenter: TextareaPresenter;

  constructor(initialState: Partial<TextareaState>) {
    
    this.entity = TextareaEntity.create(initialState);

    
    this.handleChangeUseCase = new HandleTextareaChange();
    this.validateUseCase = new ValidateTextarea();

    
    this.presenter = new TextareaPresenter();
  }

  
  getViewModel(): TextareaViewModel {
    return this.presenter.present(this.entity);
  }

  
  onChange(value: string, validateOnChange = false): void {
    const response = this.handleChangeUseCase.execute({
      textarea: this.entity,
      newValue: value,
      validateOnChange,
    });

    
    this.entity = response.updatedTextarea;
  }

  
  onBlur(): void {
    const response = this.validateUseCase.execute({
      textarea: this.entity,
    });

    
    this.entity = response.updatedTextarea;
  }

  
  validate(): boolean {
    const response = this.validateUseCase.execute({
      textarea: this.entity,
    });

    
    this.entity = response.updatedTextarea;

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

  
  setSize(size: TextareaSize): void {
    this.entity = this.entity.withSize(size);
  }

  
  setStateType(stateType: TextareaStateType): void {
    this.entity = this.entity.withStateType(stateType);
  }

  
  setMaxLength(maxLength: number | undefined): void {
    this.entity = this.entity.withMaxLength(maxLength);
  }

  
  setMinLength(minLength: number | undefined): void {
    this.entity = this.entity.withMinLength(minLength);
  }

  
  setRows(rows: number): void {
    this.entity = this.entity.withRows(rows);
  }

  
  setAutoResize(autoResize: boolean): void {
    this.entity = this.entity.withAutoResize(autoResize);
  }

  
  isInteractive(): boolean {
    return this.entity.isInteractive;
  }

  
  hasError(): boolean {
    return this.entity.hasError;
  }
}
