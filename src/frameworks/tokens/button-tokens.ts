

export const buttonTokens = {
  variants: {
    primary: {
      background: '#ffffff',
      text: '#000000',
      border: '#ffffff',
      pressed: '#a3a3a3',
    },
    secondary: {
      background: 'transparent',
      text: '#ffffff',
      border: 'rgba(255,255,255,0.1)',
      pressed: '#171717',
    },
    accent: {
      background: '#06b6d4',
      text: '#000000',
      border: '#06b6d4',
      pressed: '#22d3ee',
    },
    ghost: {
      background: 'transparent',
      text: '#a3a3a3',
      border: 'transparent',
      pressed: '#171717',
    },
    danger: {
      background: '#ef4444',
      text: '#ffffff',
      border: '#ef4444',
      pressed: '#dc2626',
    },
    outline: {
      background: 'transparent',
      text: '#ffffff',
      border: 'rgba(255,255,255,0.2)',
      pressed: '#171717',
    },
  },
  sizes: {
    xs: { height: '28px', paddingH: '10px', fontSize: '12px', radius: '8px' },
    sm: { height: '32px', paddingH: '12px', fontSize: '14px', radius: '8px' },
    md: { height: '40px', paddingH: '16px', fontSize: '14px', radius: '12px' },
    lg: { height: '44px', paddingH: '20px', fontSize: '16px', radius: '12px' },
    xl: { height: '48px', paddingH: '24px', fontSize: '16px', radius: '16px' },
  },
} as const;
