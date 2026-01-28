import { describe, it, expect, mock, afterEach } from 'bun:test';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Avatar } from '../avatar.component.web';

afterEach(() => {
  cleanup();
});

describe('Avatar Component (Clean Architecture)', () => {
  it('should render image when src is valid', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
    // In our component, both outer div and inner img might have labels/alts.
    // Inner img has alt="User Avatar".
    expect(screen.getAllByAltText('User Avatar')).toBeDefined();
  });

  it('should render fallback text when src is missing', () => {
    render(<Avatar fallback="John Doe" />);
    // Should render "JD"
    expect(screen.getByText('JD')).toBeDefined();
  });

  it('should render fallback when image fails', () => {
    render(<Avatar src="invalid.jpg" fallback="Jane Doe" alt="Jane" />);
    
    // Initial render has image
    const img = screen.getByAltText('Jane');
    fireEvent.error(img);
    
    // After error, should render text
    expect(screen.getByText('JD')).toBeDefined();
  });

  it('should handle single name fallback', () => {
    render(<Avatar fallback="Alice" />);
    expect(screen.getByText('AL')).toBeDefined();
  });

  it('should render status indicator', () => {
    render(<Avatar fallback="User" status="online" />);
    // Status span has aria-label={status}
    expect(screen.getByLabelText('online')).toBeDefined();
  });

  it('should apply size classes', () => {
    const { container } = render(<Avatar fallback="User" size="lg" />);
    const div = container.querySelector('div[role="img"]');
    // lg size corresponds to h-12 w-12 in our map
    expect(div?.className).toContain('h-12 w-12');
  });

  it('should apply shape classes', () => {
    const { container } = render(<Avatar fallback="User" shape="square" />);
    const div = container.querySelector('div[role="img"]');
    expect(div?.className).toContain('rounded-lg');
  });
});
