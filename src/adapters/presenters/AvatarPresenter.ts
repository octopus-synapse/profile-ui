import { AvatarEntity } from '../../domain/entities/avatar/AvatarState';
import { AvatarViewModel } from '../view-models/AvatarViewModel';
import { avatarTokens } from '../../frameworks/tokens/avatar-tokens';

export class AvatarPresenter {
  present(entity: AvatarEntity): AvatarViewModel {
    const state = entity.currentState;
    const sizeToken = avatarTokens.sizes[state.size];
    const shapeToken = avatarTokens.shapes[state.shape];

    return {
      src: state.src,
      alt: state.alt,
      fallback: state.fallback,
      size: state.size,
      shape: state.shape,
      ring: state.ring,
      status: state.status,
      hasImage: entity.hasImage,
      hasStatus: entity.hasStatus,
      styles: {
        dimension: sizeToken.dimension,
        fontSize: sizeToken.fontSize,
        borderRadius: shapeToken.borderRadius,
        backgroundColor: avatarTokens.colors.background,
        textColor: avatarTokens.colors.text,
        ringColor: avatarTokens.colors.ring,
      },
      statusStyles: state.status ? avatarTokens.status[state.status] : undefined,
    };
  }
}
