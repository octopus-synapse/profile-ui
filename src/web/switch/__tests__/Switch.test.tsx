import { describe, it, expect, mock, afterEach } from 'bun:test';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { Switch } from '../switch.component.web';

afterEach(() => {
  cleanup();
});

describe('Switch Component (Clean Architecture)', () => {
  describe('Rendering', () => {
    it('should render switch button', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDefined();
    });

    it('should render with testID', () => {
      render(<Switch testID="test-switch" />);
      const switchElement = screen.getByTestId('test-switch');
      expect(switchElement).toBeDefined();
    });

    it('should apply custom className', () => {
      render(<Switch className="custom-class" testID="switch" />);
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.className).toContain('custom-class');
    });

    it('should render thumb element', () => {
      const { container } = render(<Switch />);
      const thumb = container.querySelector('span');
      expect(thumb).toBeDefined();
    });
  });

  describe('Checked state', () => {
    it('should render unchecked by default', () => {
      render(<Switch testID="switch" />);
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('aria-checked')).toBe('false');
      expect(switchElement.getAttribute('data-state')).toBe('unchecked');
    });

    it('should render checked when checked prop is true', () => {
      render(<Switch checked testID="switch" />);
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('aria-checked')).toBe('true');
      expect(switchElement.getAttribute('data-state')).toBe('checked');
    });

    it('should use defaultChecked for initial state', () => {
      render(<Switch defaultChecked testID="switch" />);
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('Toggle interaction', () => {
    it('should toggle from unchecked to checked on click', async () => {
      render(<Switch testID="switch" />);
      const switchElement = screen.getByTestId('switch');

      await act(async () => {
        fireEvent.click(switchElement);
      });

      expect(switchElement.getAttribute('aria-checked')).toBe('true');
    });

    it('should call onCheckedChange with new value', () => {
      const onCheckedChange = mock((checked: boolean) => {});
      render(<Switch onCheckedChange={onCheckedChange} testID="switch" />);

      fireEvent.click(screen.getByTestId('switch'));

      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('should toggle multiple times', async () => {
      render(<Switch testID="switch" />);
      const switchElement = screen.getByTestId('switch');

      await act(async () => {
        fireEvent.click(switchElement);
      });
      expect(switchElement.getAttribute('aria-checked')).toBe('true');

      await act(async () => {
        fireEvent.click(switchElement);
      });
      expect(switchElement.getAttribute('aria-checked')).toBe('false');
    });
  });

  describe('Disabled state', () => {
    it('should render disabled switch', () => {
      render(<Switch disabled testID="switch" />);
      const switchElement = screen.getByTestId('switch');
      expect(switchElement.hasAttribute('disabled')).toBe(true);
      expect(switchElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should not toggle when disabled', () => {
      render(<Switch disabled testID="switch" />);
      const switchElement = screen.getByTestId('switch');
      fireEvent.click(switchElement);
      expect(switchElement.getAttribute('aria-checked')).toBe('false');
    });
  });

  describe('Variants', () => {
    it('should render error variant', () => {
       // Error variant styling is handled by inline styles from hook tokens
       const { container } = render(<Switch variant="error" />);
       const switchElement = container.querySelector('button');
       // We can check if style attribute contains the error color (token)
       // Error border is usually #ef4444
       expect(switchElement?.getAttribute('style')).toContain('#ef4444');
    });
  });
});
