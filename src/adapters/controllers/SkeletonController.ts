

import {
  SkeletonEntity,
  SkeletonState,
  SkeletonVariant,
  SkeletonAnimation,
} from '../../domain/entities/skeleton/SkeletonState';
import { SkeletonPresenter } from '../presenters/SkeletonPresenter';
import { SkeletonViewModel } from '../view-models/SkeletonViewModel';

export class SkeletonController {
  private entity: SkeletonEntity;
  private readonly presenter: SkeletonPresenter;

  constructor(initialState: Partial<SkeletonState>) {
    this.entity = SkeletonEntity.create(initialState);
    this.presenter = new SkeletonPresenter();
  }

  
  getViewModel(): SkeletonViewModel {
    return this.presenter.present(this.entity);
  }

  
  setWidth(width: string | number): void {
    this.entity = this.entity.withWidth(width);
  }

  
  setHeight(height: string | number): void {
    this.entity = this.entity.withHeight(height);
  }

  
  setVariant(variant: SkeletonVariant): void {
    this.entity = this.entity.withVariant(variant);
  }

  
  setAnimation(animation: SkeletonAnimation): void {
    this.entity = this.entity.withAnimation(animation);
  }
}
