import { useState, useCallback } from 'react';
import { SwitchProps, switchTokens } from '../../shared/switch/switch.types';

export function useSwitch(props: SwitchProps) {
  const {
    checked,
    defaultChecked,
    onCheckedChange,
    disabled = false,
    readOnly = false,
    required = false,
    variant = 'default',
  } = props;

  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const toggle = useCallback(() => {
    if (disabled || readOnly) return;

    const newChecked = !isChecked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onCheckedChange?.(newChecked);
  }, [disabled, readOnly, isChecked, isControlled, onCheckedChange]);

  // Styles
  const variantTokens = switchTokens.variants[variant];
  const stateTokens = isChecked ? variantTokens.on : variantTokens.off;
  
  return {
    state: {
      checked: isChecked,
      disabled,
      readOnly,
      required,
      variant,
    },
    styles: {
      root: {
        width: switchTokens.width,
        height: switchTokens.height,
        backgroundColor: stateTokens.background,
        borderColor: stateTokens.border,
        opacity: disabled ? 0.5 : 1,
        cursor: (disabled || readOnly) ? 'not-allowed' : 'pointer',
      },
      thumb: {
        width: switchTokens.thumbSize,
        height: switchTokens.thumbSize,
        backgroundColor: stateTokens.thumb,
        transform: `translateX(${isChecked ? switchTokens.thumbTranslate.on : switchTokens.thumbTranslate.off})`,
      }
    },
    handlers: {
      onCheckedChange: toggle,
    },
    accessibility: {
      role: 'switch',
      'aria-checked': isChecked,
      'aria-disabled': disabled,
      'aria-readonly': readOnly,
      'aria-required': required,
    }
  };
}
