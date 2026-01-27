

export const modalTokens = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(4px)',
  },
  content: {
    background: '#171717',
    border: 'rgba(255, 255, 255, 0.1)',
    radius: '12px',
  },
  sizes: {
    sm: {
      maxWidth: '384px',
      padding: '16px',
    },
    md: {
      maxWidth: '448px',
      padding: '24px',
    },
    lg: {
      maxWidth: '512px',
      padding: '24px',
    },
    xl: {
      maxWidth: '576px',
      padding: '32px',
    },
    full: {
      maxWidth: '100%',
      padding: '24px',
    },
  },
} as const;
