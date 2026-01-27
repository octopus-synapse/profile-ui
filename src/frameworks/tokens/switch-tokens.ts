

export const switchTokens = {
  
  width: '36px',
  height: '20px',
  thumbSize: '16px',
  thumbGap: '2px', 

  
  thumbTranslate: {
    off: '2px',
    on: '16px', 
  },

  
  variants: {
    default: {
      off: {
        background: 'rgba(255, 255, 255, 0.05)',
        border: 'rgba(255, 255, 255, 0.1)',
        thumb: '#ffffff',
      },
      on: {
        background: '#10b981', 
        border: '#10b981',
        thumb: '#ffffff',
      },
    },
    error: {
      off: {
        background: 'rgba(255, 255, 255, 0.05)',
        border: '#ef4444', 
        thumb: '#ffffff',
      },
      on: {
        background: '#ef4444',
        border: '#ef4444',
        thumb: '#ffffff',
      },
    },
  },

  
  transition: {
    duration: '150ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  
  focus: {
    ring: '2px',
    offset: '2px',
    color: 'rgba(16, 185, 129, 0.5)', 
  },
} as const;
