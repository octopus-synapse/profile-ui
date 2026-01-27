import { useState, useCallback, useMemo } from 'react';
import { AvatarController } from '../controllers/AvatarController';
import type { AvatarState } from '../../domain/entities/avatar/AvatarState';

export function useAvatar(props: Partial<AvatarState> = {}) {
  const [controller] = useState(() => new AvatarController(props));
  const [, forceUpdate] = useState(0);

  const viewModel = useMemo(() => controller.getViewModel(), [controller, forceUpdate]);

  const getInitials = useCallback((name: string) => {
    return controller.getInitials(name);
  }, [controller]);

  const onImageError = useCallback(() => {
    controller.onImageError();
    forceUpdate((t) => t + 1);
  }, [controller]);

  return { viewModel, getInitials, onImageError };
}
