

import {
  ModalEntity,
  ModalState,
  ModalSize,
} from '../../domain/entities/modal/ModalState';
import { HandleModalOpen } from '../../domain/use-cases/modal/HandleModalOpen';
import { HandleModalClose } from '../../domain/use-cases/modal/HandleModalClose';
import { HandleModalBackdropClick } from '../../domain/use-cases/modal/HandleModalBackdropClick';
import { HandleModalEscapePress } from '../../domain/use-cases/modal/HandleModalEscapePress';
import { ModalPresenter } from '../presenters/ModalPresenter';
import { ModalViewModel } from '../view-models/ModalViewModel';

export class ModalController {
  private entity: ModalEntity;
  private readonly handleOpenUseCase: HandleModalOpen;
  private readonly handleCloseUseCase: HandleModalClose;
  private readonly handleBackdropClickUseCase: HandleModalBackdropClick;
  private readonly handleEscapePressUseCase: HandleModalEscapePress;
  private readonly presenter: ModalPresenter;

  constructor(initialState: Partial<ModalState>) {
    
    this.entity = ModalEntity.create(initialState);

    
    this.handleOpenUseCase = new HandleModalOpen();
    this.handleCloseUseCase = new HandleModalClose();
    this.handleBackdropClickUseCase = new HandleModalBackdropClick();
    this.handleEscapePressUseCase = new HandleModalEscapePress();

    
    this.presenter = new ModalPresenter();
  }

  
  getViewModel(): ModalViewModel {
    return this.presenter.present(this.entity);
  }

  
  async onOpen(handler?: () => void | Promise<void>): Promise<void> {
    const response = await this.handleOpenUseCase.execute({
      modal: this.entity,
      onOpen: handler,
    });

    
    this.entity = response.updatedModal;

    
    if (!response.success) {
      throw new Error(response.error);
    }
  }

  
  async onClose(handler?: () => void | Promise<void>): Promise<void> {
    const response = await this.handleCloseUseCase.execute({
      modal: this.entity,
      onClose: handler,
    });

    
    this.entity = response.updatedModal;

    
    if (!response.success) {
      throw new Error(response.error);
    }
  }

  
  async onBackdropClick(handler?: () => void | Promise<void>): Promise<void> {
    const response = await this.handleBackdropClickUseCase.execute({
      modal: this.entity,
      onClose: handler,
    });

    
    this.entity = response.updatedModal;

    
    if (!response.success) {
      throw new Error(response.error);
    }
  }

  
  async onEscapePress(handler?: () => void | Promise<void>): Promise<void> {
    const response = await this.handleEscapePressUseCase.execute({
      modal: this.entity,
      onClose: handler,
    });

    
    this.entity = response.updatedModal;

    
    if (!response.success) {
      throw new Error(response.error);
    }
  }

  
  setSize(size: ModalSize): void {
    this.entity = this.entity.withSize(size);
  }

  
  setCloseOnEscape(closeOnEscape: boolean): void {
    this.entity = this.entity.withCloseOnEscape(closeOnEscape);
  }

  
  setCloseOnBackdropClick(closeOnBackdropClick: boolean): void {
    this.entity = this.entity.withCloseOnBackdropClick(closeOnBackdropClick);
  }

  
  setPreventBodyScroll(preventBodyScroll: boolean): void {
    this.entity = this.entity.withPreventBodyScroll(preventBodyScroll);
  }

  
  completeOpenAnimation(): void {
    this.entity = this.entity.withAnimationOpen();
  }

  
  completeCloseAnimation(): void {
    this.entity = this.entity.withAnimationClosed();
  }
}
