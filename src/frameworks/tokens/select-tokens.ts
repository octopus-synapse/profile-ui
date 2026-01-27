export const selectTokens = {
  trigger: {
    background: '#171717',
    border: 'rgba(255,255,255,0.1)',
    text: '#ffffff',
    placeholder: '#a3a3a3',
    padding: { h: 16, v: 12 },
    radius: 8,
  },
  dropdown: {
    background: '#262626',
    border: 'rgba(255,255,255,0.1)',
    shadow: '0 4px 6px -1px rgba(0,0,0,0.3)',
    radius: 8,
  },
  option: {
    background: 'transparent',
    hoverBackground: '#171717',
    selectedBackground: '#06b6d4',
    text: '#ffffff',
    padding: { h: 16, v: 10 },
  },
} as const;
