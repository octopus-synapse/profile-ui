export const avatarTokens = {
  sizes: {
    xs: { dimension: 24, fontSize: 10 },
    sm: { dimension: 32, fontSize: 12 },
    md: { dimension: 40, fontSize: 14 },
    lg: { dimension: 48, fontSize: 16 },
    xl: { dimension: 64, fontSize: 18 },
    '2xl': { dimension: 80, fontSize: 20 },
    '3xl': { dimension: 96, fontSize: 24 },
  },
  shapes: {
    circle: { borderRadius: 9999 },
    square: { borderRadius: 8 },
  },
  status: {
    online: { color: '#22c55e', label: 'Online' },
    offline: { color: '#a3a3a3', label: 'Offline' },
    away: { color: '#f59e0b', label: 'Away' },
    busy: { color: '#ef4444', label: 'Busy' },
  },
  colors: {
    background: '#171717',
    text: '#a3a3a3',
    ring: '#06b6d4',
    border: '#020202',
  },
} as const;
