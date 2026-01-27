import { useState, useMemo } from 'react';
import { SpinnerController } from '../controllers/SpinnerController';
import type { SpinnerState } from '../../domain/entities/spinner/SpinnerState';

export function useSpinner(props: Partial<SpinnerState> = {}) {
  const [controller] = useState(() => new SpinnerController(props));
  return { viewModel: useMemo(() => controller.getViewModel(), [controller]) };
}
