
import { useState, useCallback, useMemo } from 'react';
import { ModalController } from '../controllers/ModalController';
import type { ModalState, ModalSize } from '../../domain/entities/modal/ModalState';

export interface UseModalProps extends Partial<ModalState> {
  onOpen?: () => void | Promise<void>;
  onClose?: () => void | Promise<void>;
}

export function useModal(props: UseModalProps = {}) {
  const [controller] = useState(() => new ModalController(props));
  const [, setUpdateToken] = useState(0);
  const forceUpdate = useCallback(() => setUpdateToken((t) => t + 1), []);

  const viewModel = useMemo(() => controller.getViewModel(), [controller, setUpdateToken]);

  const handleOpen = useCallback(async () => {
    try {
      await controller.onOpen(props.onOpen);
      forceUpdate();
    } catch (_error) {
      forceUpdate();
    }
  }, [controller, props.onOpen, forceUpdate]);

  const handleClose = useCallback(async () => {
    try {
      await controller.onClose(props.onClose);
      forceUpdate();
    } catch (_error) {
      forceUpdate();
    }
  }, [controller, props.onClose, forceUpdate]);

  return {
    viewModel,
    handleOpen,
    handleClose,
    setSize: (s: ModalSize) => { controller.setSize(s); forceUpdate(); },
    setCloseOnEscape: (c: boolean) => { controller.setCloseOnEscape(c); forceUpdate(); },
    setCloseOnBackdropClick: (c: boolean) => { controller.setCloseOnBackdropClick(c); forceUpdate(); },
  };
}
