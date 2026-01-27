import { useState, useMemo } from 'react';
import { SkeletonController } from '../controllers/SkeletonController';
import type { SkeletonState } from '../../domain/entities/skeleton/SkeletonState';

export function useSkeleton(props: Partial<SkeletonState> = {}) {
  const [controller] = useState(() => new SkeletonController(props));
  return { viewModel: useMemo(() => controller.getViewModel(), [controller]) };
}
