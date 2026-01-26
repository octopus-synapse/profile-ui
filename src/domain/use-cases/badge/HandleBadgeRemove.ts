

import { BadgeEntity } from '../../entities/badge/BadgeState';

export interface HandleBadgeRemoveRequest {
  badge: BadgeEntity;
  handler?: () => void | Promise<void>;
}

export interface HandleBadgeRemoveResponse {
  success: boolean;
  error?: string;
}

export class HandleBadgeRemove {
  async execute(
    request: HandleBadgeRemoveRequest
  ): Promise<HandleBadgeRemoveResponse> {
    
    if (!request.badge.isInteractive) {
      return {
        success: false,
        error: 'Badge is not removable',
      };
    }

    try {
      if (request.handler) {
        await request.handler();
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Remove failed',
      };
    }
  }
}
