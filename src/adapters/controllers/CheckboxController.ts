

import {
  CheckboxEntity,
  CheckboxState,
  CheckboxValue,
  CheckboxVariant,
} from '../../domain/entities/checkbox/CheckboxState';
import { HandleCheckboxToggle } from '../../domain/use-cases/checkbox/HandleCheckboxToggle';
import {
  ValidateCheckbox,
  type ValidationRule,
} from '../../domain/use-cases/checkbox/ValidateCheckbox';
import { CheckboxPresenter } from '../presenters/CheckboxPresenter';
import { CheckboxViewModel } from '../view-models/CheckboxViewModel';

export class CheckboxController {
  private entity: CheckboxEntity;
  private readonly toggleUseCase: HandleCheckboxToggle;
  private readonly validateUseCase: ValidateCheckbox;
  private readonly presenter: CheckboxPresenter;
  private customValidationRules: ValidationRule[] = [];

  constructor(initialState: Partial<CheckboxState>) {
    
    this.entity = CheckboxEntity.create(initialState);

    
    this.toggleUseCase = new HandleCheckboxToggle();
    this.validateUseCase = new ValidateCheckbox();

    
    this.presenter = new CheckboxPresenter();
  }

  
  getViewModel(): CheckboxViewModel {
    return this.presenter.present(this.entity);
  }

  
  async onToggle(
    handler?: (value: CheckboxValue) => void | Promise<void>
  ): Promise<void> {
    const response = await this.toggleUseCase.execute({
      checkbox: this.entity,
      onChange: handler,
    });

    
    this.entity = response.updatedCheckbox;

    
    if (!response.success) {
      throw new Error(response.error);
    }
  }

  
  async setValue(
    value: CheckboxValue,
    handler?: (value: CheckboxValue) => void | Promise<void>
  ): Promise<void> {
    const response = await this.toggleUseCase.execute({
      checkbox: this.entity,
      newValue: value,
      onChange: handler,
    });

    
    this.entity = response.updatedCheckbox;

    
    if (!response.success) {
      throw new Error(response.error);
    }
  }

  
  validate(): { isValid: boolean; errors: readonly string[] } {
    return this.validateUseCase.execute({
      checkbox: this.entity,
      customRules: this.customValidationRules,
    });
  }

  
  setValidationRules(rules: ValidationRule[]): void {
    this.customValidationRules = rules;
  }

  
  setDisabled(disabled: boolean): void {
    this.entity = this.entity.withDisabled(disabled);
  }

  
  setReadonly(readonly: boolean): void {
    this.entity = this.entity.withReadonly(readonly);
  }

  
  setVariant(variant: CheckboxVariant): void {
    this.entity = this.entity.withVariant(variant);
  }

  
  setRequired(required: boolean): void {
    this.entity = this.entity.withRequired(required);
  }

  
  getEntity(): CheckboxEntity {
    return this.entity;
  }
}
