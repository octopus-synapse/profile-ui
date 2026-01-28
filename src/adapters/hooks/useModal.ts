
import { useCallback, useEffect } from 'react';
import { ModalProps, modalTokens } from '../../shared/modal/modal.types';

export function useModal(props: Partial<ModalProps> & { closeOnBackdropClick?: boolean }) {
  const {
    open = false,
    onClose,
    size = 'md',
    closeOnBackdropClick = true,
  } = props;

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open && e.key === 'Escape') {
        handleClose();
      }
    };
    if (typeof window !== 'undefined') {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, handleClose]);

  // Styles
  const sizeToken = modalTokens.sizes[size];

  return {
    state: {
        open,
        size
    },
    styles: {
        overlayBackground: modalTokens.overlay.background,
        maxWidth: sizeToken.maxWidth,
        padding: sizeToken.padding,
        backgroundColor: modalTokens.content.background,
        borderRadius: modalTokens.content.radius,
        borderColor: modalTokens.content.border
    },
    handlers: {
        onClose: handleClose,
    },
    config: {
        closeOnBackdropClick
    }
  };
}
