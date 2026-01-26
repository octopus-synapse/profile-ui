export const tabsTokens = {
  variants: {
    default: {
      background: 'transparent',
      activeBackground: '#171717',
      border: 'rgba(255,255,255,0.1)',
      activeBorder: '#06b6d4',
    },
    underline: {
      background: 'transparent',
      activeBackground: 'transparent',
      border: 'transparent',
      activeBorder: '#06b6d4',
    },
    pills: {
      background: 'transparent',
      activeBackground: '#06b6d4',
      border: 'transparent',
      activeBorder: 'transparent',
    },
  },
  colors: {
    text: '#a3a3a3',
    activeText: '#ffffff',
  },
  spacing: { gap: 8, padding: 12 },
  radius: 6,
} as const;
