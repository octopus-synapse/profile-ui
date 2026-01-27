import { AvatarEntity, AvatarState, AvatarSize, AvatarShape, AvatarStatus } from '../../domain/entities/avatar/AvatarState';
import { GetInitials } from '../../domain/use-cases/avatar/GetInitials';
import { HandleImageError } from '../../domain/use-cases/avatar/HandleImageError';
import { AvatarPresenter } from '../presenters/AvatarPresenter';
import { AvatarViewModel } from '../view-models/AvatarViewModel';

export class AvatarController {
  private entity: AvatarEntity;
  private readonly getInitialsUseCase: GetInitials;
  private readonly handleImageErrorUseCase: HandleImageError;
  private readonly presenter: AvatarPresenter;

  constructor(initialState: Partial<AvatarState>) {
    this.entity = AvatarEntity.create(initialState);
    this.getInitialsUseCase = new GetInitials();
    this.handleImageErrorUseCase = new HandleImageError();
    this.presenter = new AvatarPresenter();
  }

  getViewModel(): AvatarViewModel {
    return this.presenter.present(this.entity);
  }

  getInitials(name: string): string {
    const response = this.getInitialsUseCase.execute({ name });
    return response.initials;
  }

  onImageError(): void {
    const response = this.handleImageErrorUseCase.execute({ avatar: this.entity });
    this.entity = response.updatedAvatar;
  }

  setSize(size: AvatarSize): void {
    this.entity = this.entity.withSize(size);
  }

  setShape(shape: AvatarShape): void {
    this.entity = this.entity.withShape(shape);
  }

  setRing(ring: boolean): void {
    this.entity = this.entity.withRing(ring);
  }

  setStatus(status: AvatarStatus): void {
    this.entity = this.entity.withStatus(status);
  }
}
