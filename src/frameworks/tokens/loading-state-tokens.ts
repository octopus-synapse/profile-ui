export const loadingStateTokens = {
  variants: {
    loading: { color: '#06b6d4', icon: 'spinner' },
    success: { color: '#22c55e', icon: 'check' },
    error: { color: '#ef4444', icon: 'x' },
    idle: { color: '#a3a3a3', icon: 'none' },
  },
  messageColor: '#a3a3a3',
  spacing: 12,
} as const;
