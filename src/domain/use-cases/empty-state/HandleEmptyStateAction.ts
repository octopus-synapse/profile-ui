

import { EmptyStateEntity } from '../../entities/empty-state/EmptyStateState';

export interface HandleEmptyStateActionRequest {
  emptyState: EmptyStateEntity;
  handler?: () => void | Promise<void>;
}

export interface HandleEmptyStateActionResponse {
  success: boolean;
  error?: string;
}

export class HandleEmptyStateAction {
  async execute(
    request: HandleEmptyStateActionRequest
  ): Promise<HandleEmptyStateActionResponse> {
    
    if (!request.emptyState.isInteractive) {
      return {
        success: false,
        error: 'EmptyState has no action defined',
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
        error: error instanceof Error ? error.message : 'Action failed',
      };
    }
  }
}
