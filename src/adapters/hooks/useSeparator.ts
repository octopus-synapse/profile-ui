import { useState, useMemo } from 'react';
import { SeparatorController } from '../controllers/SeparatorController';
import type { SeparatorState } from '../../domain/entities/separator/SeparatorState';

export function useSeparator(props: Partial<SeparatorState> = {}) {
  const [controller] = useState(() => new SeparatorController(props));
  return { viewModel: useMemo(() => controller.getViewModel(), [controller]) };
}
