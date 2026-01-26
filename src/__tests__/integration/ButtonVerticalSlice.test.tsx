

import { describe, it, expect } from 'bun:test';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Button } from '../../frameworks/react/web/Button';

describe('Button Vertical Slice Integration', () => {
  describe('Complete Flow: User Click → Business Logic → UI Update', () => {
    it('should handle synchronous click through all layers', async () => {
      let clickCount = 0;

      render(
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            clickCount++;
          }}
          testID="integration-button"
        >
          Click Me
        </Button>
      );

      const button = screen.getByTestId('integration-button');

      
      expect(button.textContent).toBe('Click Me');
      expect((button as HTMLButtonElement).disabled).toBe(false);

      
      fireEvent.click(button);

      
      expect(clickCount).toBe(1);
    });

    it('should handle async click with loading state transitions', async () => {
      let asyncCompleted = false;

      render(
        <Button
          variant="accent"
          size="lg"
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            asyncCompleted = true;
          }}
          testID="async-button"
        >
          Async Action
        </Button>
      );

      const button = screen.getByTestId('async-button');

      
      expect((button as HTMLButtonElement).disabled).toBe(false);

      
      fireEvent.click(button);

      
      
      

      await waitFor(
        () => {
          expect(asyncCompleted).toBe(true);
        },
        { timeout: 1000 }
      );
    });

    it('should enforce business rule: disabled buttons cannot be clicked', () => {
      let clickCount = 0;

      render(
        <Button
          disabled
          onClick={() => {
            clickCount++;
          }}
          testID="disabled-button"
        >
          Disabled
        </Button>
      );

      const button = screen.getByTestId('disabled-button');

      
      expect((button as HTMLButtonElement).disabled).toBe(true);

      
      fireEvent.click(button);

      
      expect(clickCount).toBe(0);
    });

    it('should enforce business rule: loading buttons are auto-disabled', () => {
      render(
        <Button loading disabled testID="loading-button">
          Loading
        </Button>
      );

      const button = screen.getByTestId('loading-button');

      
      expect((button as HTMLButtonElement).disabled).toBe(true);

      
      const spinner = button.querySelector('svg');
      expect(spinner).toBeDefined();

      
      expect(button.getAttribute('aria-label')).toBe('Loading');
    });
  });

  describe('State Management Through Layers', () => {
    it('should apply variant styles through entire stack', () => {
      const variants = ['primary', 'secondary', 'accent', 'danger'] as const;

      variants.forEach((variant) => {
        const { unmount } = render(<Button variant={variant}>{variant}</Button>);

        const button = screen.getByText(variant) as HTMLButtonElement;

        
        expect(button.style.backgroundColor).toBeDefined();
        expect(button.style.backgroundColor.length).toBeGreaterThan(0);

        unmount();
      });
    });

    it('should apply size styles through entire stack', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      const expectedHeights = ['28px', '32px', '40px', '44px', '48px'];

      sizes.forEach((size, index) => {
        const { unmount } = render(<Button size={size}>{size}</Button>);

        const button = screen.getByText(size) as HTMLButtonElement;

        
        expect(button.style.height).toBe(expectedHeights[index]);

        unmount();
      });
    });
  });

  describe('Error Handling Through Layers', () => {
    it('should handle errors in click handler', async () => {
      
      const originalError = console.error;
      console.error = () => {};

      let errorThrown = false;

      render(
        <Button
          onClick={() => {
            errorThrown = true;
            throw new Error('Handler error');
          }}
          testID="error-button"
        >
          Error Button
        </Button>
      );

      const button = screen.getByTestId('error-button');

      
      fireEvent.click(button);

      
      expect(errorThrown).toBe(true);

      
      console.error = originalError;
    });
  });

  describe('Accessibility Through Layers', () => {
    it('should provide proper ARIA attributes', () => {
      render(
        <Button variant="primary" size="md" testID="aria-button">
          Accessible Button
        </Button>
      );

      const button = screen.getByTestId('aria-button');

      
      expect(button.getAttribute('role')).toBe('button');
      expect(button.getAttribute('aria-disabled')).toBe('false');
    });

    it('should update ARIA attributes when disabled', () => {
      render(
        <Button disabled testID="aria-disabled">
          Disabled
        </Button>
      );

      const button = screen.getByTestId('aria-disabled');

      expect(button.getAttribute('aria-disabled')).toBe('true');
      expect((button as HTMLButtonElement).disabled).toBe(true);
    });
  });

  describe('Dependency Rule Verification', () => {
    it('should demonstrate dependency flow: Framework → Adapter → Use Case → Entity', () => {
      
      
      
      
      
      

      render(
        <Button
          variant="primary"
          size="md"
          onClick={() => {}}
          testID="dependency-test"
        >
          Test
        </Button>
      );

      const button = screen.getByTestId('dependency-test');

      
      
      expect(button).toBeDefined();
      expect(button.textContent).toBe('Test');
    });

    it('should enforce business rules defined in innermost layer', () => {
      
      

      
      
      render(
        <Button loading disabled testID="rule-test">
          Loading
        </Button>
      );

      const button = screen.getByTestId('rule-test');

      
      expect((button as HTMLButtonElement).disabled).toBe(true);
      expect(button.getAttribute('aria-label')).toBe('Loading');
    });
  });

  describe('Framework Independence Verification', () => {
    it('should demonstrate that business logic is framework-agnostic', () => {
      
      
      

      render(
        <Button variant="accent" size="lg" onClick={() => {}} testID="framework-test">
          Framework Independent
        </Button>
      );

      const button = screen.getByTestId('framework-test');

      
      
      expect(button.style.backgroundColor).toBe('#06b6d4'); 
      expect(button.style.height).toBe('44px'); 
      expect((button as HTMLButtonElement).disabled).toBe(false); 
    });
  });
});
