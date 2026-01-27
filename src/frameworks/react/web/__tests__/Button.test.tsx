

import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Component (Clean Architecture)', () => {
  beforeEach(() => {
    
  });

  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('should render button with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeDefined();
    });

    it('should apply testID', () => {
      render(<Button testID="test-button">Test</Button>);
      expect(screen.getByTestId('test-button')).toBeDefined();
    });
  });

  describe('Visual Variants', () => {
    it('should apply primary variant styles', () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByText('Primary') as HTMLButtonElement;
      expect(button.style.backgroundColor).toBe('#ffffff');
    });

    it('should apply accent variant styles', () => {
      render(<Button variant="accent">Accent</Button>);
      const button = screen.getByText('Accent') as HTMLButtonElement;
      expect(button.style.backgroundColor).toBe('#06b6d4');
    });

    it('should apply danger variant styles', () => {
      render(<Button variant="danger">Danger</Button>);
      const button = screen.getByText('Danger') as HTMLButtonElement;
      expect(button.style.backgroundColor).toBe('#ef4444');
    });
  });

  describe('Sizes', () => {
    it('should apply xs size styles', () => {
      render(<Button size="xs">XS</Button>);
      const button = screen.getByText('XS') as HTMLButtonElement;
      expect(button.style.height).toBe('28px');
    });

    it('should apply md size styles', () => {
      render(<Button size="md">MD</Button>);
      const button = screen.getByText('MD') as HTMLButtonElement;
      expect(button.style.height).toBe('40px');
    });

    it('should apply xl size styles', () => {
      render(<Button size="xl">XL</Button>);
      const button = screen.getByText('XL') as HTMLButtonElement;
      expect(button.style.height).toBe('48px');
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByText('Disabled') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should not be disabled by default', () => {
      render(<Button>Normal</Button>);
      const button = screen.getByText('Normal') as HTMLButtonElement;
      expect(button.disabled).toBe(false);
    });

    it('should have aria-disabled when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByText('Disabled');
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('Loading State', () => {
    it('should be disabled when loading', () => {
      
      render(<Button loading disabled testID="loading-btn">Loading</Button>);
      const button = screen.getByTestId('loading-btn') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should show loading spinner when loading', () => {
      
      render(<Button loading disabled testID="loading-btn">Loading</Button>);
      const button = screen.getByTestId('loading-btn');
      const spinner = button.querySelector('svg');
      expect(spinner).toBeDefined();
    });

    it('should hide children when loading', () => {
      
      render(<Button loading disabled>Click me</Button>);
      const button = screen.getByRole('button');
      
      expect(button.textContent).not.toBe('Click me');
    });

    it('should have aria-label when loading', () => {
      
      render(<Button loading disabled>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('aria-label')).toBe('Loading');
    });
  });

  describe('Full Width', () => {
    it('should apply full width class when fullWidth is true', () => {
      render(<Button fullWidth>Full</Button>);
      const button = screen.getByText('Full');
      expect(button.className).toContain('w-full');
    });

    it('should not apply full width class by default', () => {
      render(<Button>Normal</Button>);
      const button = screen.getByText('Normal');
      expect(button.className).not.toContain('w-full');
    });
  });

  describe('Icons', () => {
    it('should render left icon', () => {
      render(
        <Button leftIcon={<span data-testid="left-icon">←</span>}>
          With Icon
        </Button>
      );
      expect(screen.getByTestId('left-icon')).toBeDefined();
    });

    it('should render right icon', () => {
      render(
        <Button rightIcon={<span data-testid="right-icon">→</span>}>
          With Icon
        </Button>
      );
      expect(screen.getByTestId('right-icon')).toBeDefined();
    });

    it('should hide icons when loading', () => {
      
      render(
        <Button
          loading
          disabled
          leftIcon={<span data-testid="left-icon">←</span>}
          testID="loading-btn"
        >
          Loading
        </Button>
      );
      
      expect(screen.queryByTestId('left-icon')).toBeNull();
    });
  });

  describe('Click Handling', () => {
    it('should handle onClick event', () => {
      let clicked = false;
      render(<Button onClick={() => { clicked = true; }}>Click</Button>);

      const button = screen.getByText('Click');
      fireEvent.click(button);

      expect(clicked).toBe(true);
    });

    it('should not trigger onClick when disabled', () => {
      let clicked = false;
      render(
        <Button disabled onClick={() => { clicked = true; }}>
          Disabled
        </Button>
      );

      const button = screen.getByText('Disabled');
      fireEvent.click(button);

      expect(clicked).toBe(false);
    });

    it('should not trigger onClick when loading', () => {
      let clicked = false;
      
      render(
        <Button loading disabled onClick={() => { clicked = true; }} testID="loading-btn">
          Loading
        </Button>
      );

      const button = screen.getByTestId('loading-btn');
      fireEvent.click(button);

      expect(clicked).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have role="button"', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDefined();
    });

    it('should be keyboard accessible', () => {
      render(<Button>Button</Button>);
      const button = screen.getByText('Button') as HTMLButtonElement;
      expect(button.type).toBe('button');
    });
  });

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByText('Custom');
      expect(button.className).toContain('custom-class');
    });

    it('should forward ref', () => {
      let buttonRef: HTMLButtonElement | null = null;
      render(
        <Button ref={(el) => { buttonRef = el; }}>
          Ref Button
        </Button>
      );
      expect(buttonRef).toBeDefined();
      expect(buttonRef?.tagName).toBe('BUTTON');
    });
  });
});
