import { useState, useCallback } from 'react';
import { AvatarProps, avatarTokens, getInitials } from '../../shared/avatar/avatar.types';

export function useAvatar(props: AvatarProps) {
  const { src, fallback, alt, status, size = 'md', shape = 'circle' } = props;
  const [hasError, setHasError] = useState(false);

  const onImageError = useCallback(() => {
    setHasError(true);
  }, []);

  const showImage = !!src && !hasError;
  const initials = fallback ? getInitials(fallback) : '';

  const statusToken = status ? avatarTokens.status[status] : undefined;

  return {
    state: {
        src,
        hasError,
        showImage,
        initials,
        fallback,
        status,
        size,
        shape
    },
    styles: {
        status: statusToken ? {
            backgroundColor: statusToken.color
        } : undefined
    },
    handlers: {
        onImageError
    },
    accessibility: {
        role: 'img',
        'aria-label': alt || fallback || 'Avatar'
    }
  };
}
