

import {
  SwitchEntity,
  SwitchState,
  SwitchValue,
  SwitchVariant,
} from '../../domain/entities/switch/SwitchState';
import { HandleSwitchToggle } from '../../domain/use-cases/switch/HandleSwitchToggle';
import {
  ValidateSwitch,
  type ValidationRule,
} from '../../domain/use-cases/switch/ValidateSwitch';
import { SwitchPresenter } from '../presenters/SwitchPresenter';
import { SwitchViewModel } from '../view-models/SwitchViewModel';

export class SwitchController {
  private entity: SwitchEntity;
  private readonly toggleUseCase: HandleSwitchToggle;
  private readonly validateUseCase: ValidateSwitch;
  private readonly presenter: SwitchPresenter;
  private customValidationRules: ValidationRule[] = [];

  constructor(initialState: Partial<SwitchState>) {
    
    this.entity = SwitchEntity.create(initialState);

    
    this.toggleUseCase = new HandleSwitchToggle();
    this.validateUseCase = new ValidateSwitch();

    
    this.presenter = new SwitchPresenter();
  }

  
  getViewModel(): SwitchViewModel {
    return this.presenter.present(this.entity);
  }

  
  async onToggle(
    handler?: (value: SwitchValue) => void | Promise<void>
  ): Promise<void> {
    const response = await this.toggleUseCase.execute({
      switchEntity: this.entity,
      onChange: handler,
    });

    
    this.entity = response.updatedSwitch;

    
    if (!response.success) {
      throw new Error(response.error);
    }
  }

  
  async setValue(
    value: SwitchValue,
    handler?: (value: SwitchValue) => void | Promise<void>
  ): Promise<void> {
    const response = await this.toggleUseCase.execute({
      switchEntity: this.entity,
      newValue: value,
      onChange: handler,
    });

    
    this.entity = response.updatedSwitch;

    
    if (!response.success) {
      throw new Error(response.error);
    }
  }

  
  validate(): { isValid: boolean; errors: readonly string[] } {
    return this.validateUseCase.execute({
      switchEntity: this.entity,
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

  
  setVariant(variant: SwitchVariant): void {
    this.entity = this.entity.withVariant(variant);
  }

  
  getEntity(): SwitchEntity {
    return this.entity;
  }
}
