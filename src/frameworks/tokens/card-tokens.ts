export const cardTokens = {
  padding: { none: 0, sm: 16, md: 24, lg: 32 },
  variants: {
    default: { background: '#0a0a0a', border: 'rgba(255,255,255,0.1)', shadow: 'none' },
    outlined: { background: 'transparent', border: 'rgba(255,255,255,0.1)', shadow: 'none' },
    filled: { background: '#171717', border: 'transparent', shadow: 'none' },
    elevated: { background: '#0a0a0a', border: 'transparent', shadow: '0 4px 6px -1px rgba(0,0,0,0.3)' },
    ghost: { background: 'transparent', border: 'transparent', shadow: 'none' },
  },
  radius: 12,
} as const;
