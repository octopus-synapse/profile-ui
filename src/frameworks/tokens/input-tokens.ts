

export const inputTokens = {
  sizes: {
    sm: {
      height: '32px',
      paddingH: '12px',
      fontSize: '14px',
    },
    md: {
      height: '40px',
      paddingH: '14px',
      fontSize: '14px',
    },
    lg: {
      height: '48px',
      paddingH: '16px',
      fontSize: '16px',
    },
  },
  states: {
    default: {
      border: 'rgba(255,255,255,0.1)',
      focus: '#06b6d4',
    },
    error: {
      border: '#ef4444',
      focus: '#ef4444',
    },
    success: {
      border: '#22c55e',
      focus: '#22c55e',
    },
  },
  colors: {
    background: '#0a0a0a',
    text: '#ffffff',
    placeholder: '#a3a3a3',
    disabled: {
      background: '#171717',
      text: '#525252',
    },
    error: '#ef4444',
  },
  radius: '8px',
  transition: '150ms',
} as const;
