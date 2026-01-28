import { describe, it, expect, mock, afterEach } from 'bun:test';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Textarea } from '../textarea.component.web';

afterEach(() => {
  cleanup();
});

describe('Textarea Component (Clean Architecture)', () => {
  it('should render textarea', () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeDefined();
  });

  it('should handle text change', () => {
    const onValueChange = mock((_val: string) => {});
    render(<Textarea onValueChange={onValueChange} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    expect(onValueChange).toHaveBeenCalledWith('Hello');
    expect(textarea.value).toBe('Hello');
  });

  it('should display error message', () => {
    render(<Textarea error="Field required" />);
    expect(screen.getByText('Field required')).toBeDefined();
  });

  it('should display helper text', () => {
    render(<Textarea helperText="Help info" />);
    expect(screen.getByText('Help info')).toBeDefined();
  });

  it('should show character count', () => {
    render(<Textarea showCharacterCount defaultValue="Hello" />);
    // "5" might be hard to find exactly if inside a span like "5 / 10" or just "5"
    // Our component renders <span>{charCount}</span>
    // But if maxLength is present, it renders <span>{charCount} / {maxLength}</span>
    expect(screen.getByText('5')).toBeDefined();
  });

  it('should show max length indicator', () => {
    render(<Textarea showCharacterCount maxLength={10} defaultValue="Hello" />);
    // "5 / 10"
    expect(screen.getByText('5 / 10')).toBeDefined();
  });

  it('should show word count', () => {
    render(<Textarea showWordCount defaultValue="Hello World" />);
    // "2 words"
    expect(screen.getByText('2 words')).toBeDefined();
  });

  it('should be disabled', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea.hasAttribute('disabled')).toBe(true);
  });

  it('should apply size classes or styles', () => {
      // We rely on styles from hook
      const { container } = render(<Textarea size="lg" />);
      const textarea = container.querySelector('textarea');
      // lg minHeight is 100px
      expect(textarea?.getAttribute('style')).toContain('min-height: 100px');
  });
});
