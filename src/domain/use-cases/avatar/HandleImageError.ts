

import { AvatarEntity } from '../../entities/avatar/AvatarState';

export interface HandleImageErrorRequest {
  avatar: AvatarEntity;
}

export interface HandleImageErrorResponse {
  updatedAvatar: AvatarEntity;
  shouldShowFallback: boolean;
}

export class HandleImageError {
  execute(request: HandleImageErrorRequest): HandleImageErrorResponse {
    return {
      updatedAvatar: request.avatar.withSrc(null),
      shouldShowFallback: true,
    };
  }
}
