

export const checkboxTokens = {
  size: '16px',
  radius: '4px',
  checkmarkSize: '12px',
  variants: {
    default: {
      unchecked: {
        background: '#171717',
        border: 'rgba(255,255,255,0.1)',
      },
      checked: {
        background: '#06b6d4',
        border: '#06b6d4',
        checkmark: '#000000',
      },
      indeterminate: {
        background: '#06b6d4',
        border: '#06b6d4',
        indicator: '#000000',
      },
    },
    error: {
      unchecked: {
        background: '#171717',
        border: '#ef4444',
      },
      checked: {
        background: '#ef4444',
        border: '#ef4444',
        checkmark: '#ffffff',
      },
      indeterminate: {
        background: '#ef4444',
        border: '#ef4444',
        indicator: '#ffffff',
      },
    },
  },
  colors: {
    label: '#ffffff',
    description: '#a3a3a3',
    error: '#ef4444',
  },
  focus: {
    ring: '2px',
    offset: '2px',
    color: 'rgba(6, 182, 212, 0.5)',
  },
} as const;
