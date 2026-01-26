

export const textareaTokens = {
  
  sizes: {
    sm: {
      minHeight: '60px',
      paddingH: '8px',
      paddingV: '6px',
      fontSize: '13px',
    },
    md: {
      minHeight: '80px',
      paddingH: '12px',
      paddingV: '8px',
      fontSize: '14px',
    },
    lg: {
      minHeight: '100px',
      paddingH: '16px',
      paddingV: '10px',
      fontSize: '16px',
    },
  },

  
  states: {
    default: {
      border: 'rgba(255, 255, 255, 0.1)',
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
    background: '#030303',
    text: '#ffffff',
    placeholder: '#52525b', 
    disabled: {
      background: '#030303',
      text: 'rgba(255, 255, 255, 0.5)',
    },
  },

  
  radius: '6px',
} as const;
