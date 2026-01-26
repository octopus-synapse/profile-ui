

import { describe, it, expect, mock, afterEach } from 'bun:test';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { SwitchClean } from '../switch-clean.component.web';

afterEach(() => {
  cleanup();
});

describe('SwitchClean Component', () => {
  
  
  

  describe('Rendering', () => {
    it('should render switch button', () => {
      
      render(<SwitchClean />);

      
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDefined();
    });

    it('should render with testID', () => {
      
      render(<SwitchClean testID="test-switch" />);

      
      const switchElement = screen.getByTestId('test-switch');
      expect(switchElement).toBeDefined();
    });

    it('should apply custom className', () => {
      
      render(<SwitchClean className="custom-class" testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.className).toContain('custom-class');
    });

    it('should render thumb element', () => {
      
      const { container } = render(<SwitchClean />);

      
      const thumb = container.querySelector('span');
      expect(thumb).toBeDefined();
    });
  });

  
  
  

  describe('Checked state', () => {
    it('should render unchecked by default', () => {
      
      render(<SwitchClean testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('aria-checked')).toBe('false');
      expect(switchElement.getAttribute('data-state')).toBe('unchecked');
    });

    it('should render checked when checked prop is true', () => {
      
      render(<SwitchClean checked testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('aria-checked')).toBe('true');
      expect(switchElement.getAttribute('data-state')).toBe('checked');
    });

    it('should render unchecked when checked prop is false', () => {
      
      render(<SwitchClean checked={false} testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('aria-checked')).toBe('false');
    });

    it('should use defaultChecked for initial state', () => {
      
      render(<SwitchClean defaultChecked testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('aria-checked')).toBe('true');
    });
  });

  
  
  

  describe('Toggle interaction', () => {
    it('should toggle from unchecked to checked on click', async () => {
      
      render(<SwitchClean testID="switch" />);
      const switchElement = screen.getByTestId('switch');

      
      await act(async () => {
        fireEvent.click(switchElement);
      });

      
      expect(switchElement.getAttribute('aria-checked')).toBe('true');
    });

    it('should toggle from checked to unchecked on click', async () => {
      
      render(<SwitchClean checked testID="switch" />);
      const switchElement = screen.getByTestId('switch');

      
      await act(async () => {
        fireEvent.click(switchElement);
      });

      
      expect(switchElement.getAttribute('aria-checked')).toBe('false');
    });

    it('should call onCheckedChange with new value', () => {
      
      const onCheckedChange = mock((checked: boolean) => {});
      render(<SwitchClean onCheckedChange={onCheckedChange} testID="switch" />);

      
      fireEvent.click(screen.getByTestId('switch'));

      
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('should call onCheckedChange when toggling to unchecked', () => {
      
      const onCheckedChange = mock((checked: boolean) => {});
      render(
        <SwitchClean checked onCheckedChange={onCheckedChange} testID="switch" />
      );

      
      fireEvent.click(screen.getByTestId('switch'));

      
      expect(onCheckedChange).toHaveBeenCalledWith(false);
    });

    it('should toggle multiple times', async () => {
      
      render(<SwitchClean testID="switch" />);
      const switchElement = screen.getByTestId('switch');

      
      await act(async () => {
        fireEvent.click(switchElement);
      });
      expect(switchElement.getAttribute('aria-checked')).toBe('true');

      
      await act(async () => {
        fireEvent.click(switchElement);
      });
      expect(switchElement.getAttribute('aria-checked')).toBe('false');

      
      await act(async () => {
        fireEvent.click(switchElement);
      });
      expect(switchElement.getAttribute('aria-checked')).toBe('true');
    });
  });

  
  
  

  describe('Disabled state', () => {
    it('should render disabled switch', () => {
      
      render(<SwitchClean disabled testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.hasAttribute('disabled')).toBe(true);
      expect(switchElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should not toggle when disabled', () => {
      
      render(<SwitchClean disabled testID="switch" />);
      const switchElement = screen.getByTestId('switch');

      
      fireEvent.click(switchElement);

      
      expect(switchElement.getAttribute('aria-checked')).toBe('false');
    });

    it('should not call onCheckedChange when disabled', () => {
      
      const onCheckedChange = mock((checked: boolean) => {});
      render(
        <SwitchClean disabled onCheckedChange={onCheckedChange} testID="switch" />
      );

      
      fireEvent.click(screen.getByTestId('switch'));

      
      expect(onCheckedChange).not.toHaveBeenCalled();
    });

    it('should apply opacity style when disabled', () => {
      
      render(<SwitchClean disabled testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.className).toContain('opacity-50');
    });

    it('should apply not-allowed cursor when disabled', () => {
      
      render(<SwitchClean disabled testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.className).toContain('cursor-not-allowed');
    });
  });

  
  
  

  describe('Readonly state', () => {
    it('should render readonly switch', () => {
      
      render(<SwitchClean readOnly testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('aria-readonly')).toBe('true');
    });

    it('should not toggle when readonly', () => {
      
      render(<SwitchClean readOnly testID="switch" />);
      const switchElement = screen.getByTestId('switch');

      
      fireEvent.click(switchElement);

      
      expect(switchElement.getAttribute('aria-checked')).toBe('false');
    });

    it('should not call onCheckedChange when readonly', () => {
      
      const onCheckedChange = mock((checked: boolean) => {});
      render(
        <SwitchClean readOnly onCheckedChange={onCheckedChange} testID="switch" />
      );

      
      fireEvent.click(screen.getByTestId('switch'));

      
      expect(onCheckedChange).not.toHaveBeenCalled();
    });
  });

  
  
  

  describe('Variants', () => {
    it('should render default variant', () => {
      
      const { container } = render(<SwitchClean variant="default" />);

      
      const switchElement = container.querySelector('button');
      expect(switchElement).toBeDefined();
    });

    it('should render error variant with red border when unchecked', () => {
      
      const { container } = render(<SwitchClean variant="error" />);

      
      const switchElement = container.querySelector('button');
      const style = switchElement?.getAttribute('style');
      expect(style).toContain('#ef4444'); 
    });

    it('should render error variant with red background when checked', () => {
      
      const { container } = render(<SwitchClean variant="error" checked />);

      
      const switchElement = container.querySelector('button');
      const style = switchElement?.getAttribute('style');
      expect(style).toContain('#ef4444');
    });
  });

  
  
  

  describe('Accessibility', () => {
    it('should have role="switch"', () => {
      
      render(<SwitchClean testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('role')).toBe('switch');
    });

    it('should have aria-checked attribute', () => {
      
      render(<SwitchClean testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.hasAttribute('aria-checked')).toBe(true);
    });

    it('should set aria-label from accessibilityLabel', () => {
      
      render(<SwitchClean accessibilityLabel="Toggle setting" testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('aria-label')).toBe('Toggle setting');
    });

    it('should set aria-label from aria-label prop', () => {
      
      render(<SwitchClean aria-label="Custom label" testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('aria-label')).toBe('Custom label');
    });

    it('should prioritize accessibilityLabel over aria-label', () => {
      
      render(
        <SwitchClean
          accessibilityLabel="Accessibility"
          aria-label="Aria"
          testID="switch"
        />
      );

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('aria-label')).toBe('Accessibility');
    });

    it('should be keyboard accessible (button element)', () => {
      
      render(<SwitchClean testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.tagName).toBe('BUTTON');
    });

    it('should have type="button" to prevent form submission', () => {
      
      render(<SwitchClean testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('type')).toBe('button');
    });
  });

  
  
  

  describe('Styles and visual states', () => {
    it('should apply thumb translate when unchecked', () => {
      
      const { container } = render(<SwitchClean />);

      
      const thumb = container.querySelector('span');
      const transform = thumb?.getAttribute('style');
      expect(transform).toContain('translateX(2px)'); 
    });

    it('should apply thumb translate when checked', () => {
      
      const { container } = render(<SwitchClean checked />);

      
      const thumb = container.querySelector('span');
      const transform = thumb?.getAttribute('style');
      expect(transform).toContain('translateX(16px)'); 
    });

    it('should have transition classes for smooth animation', () => {
      
      render(<SwitchClean testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.className).toContain('transition-all');
    });

    it('should apply focus-visible styles', () => {
      
      render(<SwitchClean testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.className).toContain('focus-visible:ring-2');
    });
  });

  
  
  

  describe('Ref forwarding', () => {
    it('should forward ref to button element', () => {
      
      let buttonRef: HTMLButtonElement | null = null;

      
      render(
        <SwitchClean
          ref={(el) => {
            buttonRef = el;
          }}
          testID="switch"
        />
      );

      
      expect(buttonRef).not.toBeNull();
      expect(buttonRef?.tagName).toBe('BUTTON');
    });
  });

  
  
  

  describe('Edge cases', () => {
    it('should handle rapid clicks', async () => {
      
      render(<SwitchClean testID="switch" />);
      const switchElement = screen.getByTestId('switch');

      
      await act(async () => {
        fireEvent.click(switchElement);
        fireEvent.click(switchElement);
        fireEvent.click(switchElement);
      });

      
      expect(switchElement.getAttribute('aria-checked')).toBe('true');
    });

    it('should handle missing onCheckedChange gracefully', () => {
      
      render(<SwitchClean testID="switch" />);

      
      expect(() => {
        fireEvent.click(screen.getByTestId('switch'));
      }).not.toThrow();
    });

    it('should pass through additional HTML props', () => {
      
      render(<SwitchClean data-custom="value" testID="switch" />);

      
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('data-custom')).toBe('value');
    });

    it('should handle async onCheckedChange', async () => {
      
      let asyncValue: boolean | null = null;
      const onCheckedChange = async (value: boolean) => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        asyncValue = value;
      };

      const { getByTestId } = render(<SwitchClean onCheckedChange={onCheckedChange} testID="async-switch" />);

      
      await act(async () => {
        fireEvent.click(getByTestId('async-switch'));
        
        await new Promise((resolve) => setTimeout(resolve, 20));
      });

      
      expect(asyncValue).toBe(true);
    });
  });
});
