import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../select.component.web';
import { describe, it, expect, beforeEach, afterEach, jest } from 'bun:test';

// Mock pointer capture methods for Radix UI
// We need to extend Element.prototype because Radix calls these on elements
beforeEach(() => {
  // @ts-ignore
  Element.prototype.hasPointerCapture = () => false;
  // @ts-ignore
  Element.prototype.setPointerCapture = () => {};
  // @ts-ignore
  Element.prototype.releasePointerCapture = () => {};
});

describe('Select Component (Clean Architecture)', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3', disabled: true },
  ];

  it('should render trigger with placeholder', () => {
    render(<Select options={options} placeholder="Select an option" />);
    // Radix Select Value renders the placeholder when empty
    expect(screen.getByText('Select an option')).toBeTruthy();
  });

  it('should open dropdown when clicked', async () => {
    render(<Select options={options} placeholder="Select" />);
    
    const trigger = screen.getByRole('combobox');
    fireEvent.pointerDown(trigger); 
    fireEvent.click(trigger);
    
    const option1 = await screen.findByRole('option', { name: 'Option 1' });
    expect(option1).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeTruthy();
  });

  it('should select an option', async () => {
    const onValueChange = jest.fn();
    render(<Select options={options} onValueChange={onValueChange} placeholder="Select" />);
    
    const trigger = screen.getByRole('combobox');
    fireEvent.pointerDown(trigger);
    fireEvent.click(trigger);
    
    const option2 = await screen.findByRole('option', { name: 'Option 2' });
    fireEvent.click(option2);
    
    expect(onValueChange).toHaveBeenCalledWith('2');
    // After selection, the trigger should show the selected label
    expect(screen.getByText('Option 2')).toBeTruthy();
  });

  it('should not select disabled option', async () => {
    const onValueChange = jest.fn();
    render(<Select options={options} onValueChange={onValueChange} placeholder="Select" />);
    
    const trigger = screen.getByRole('combobox');
    fireEvent.pointerDown(trigger);
    fireEvent.click(trigger);
    
    const option3 = await screen.findByRole('option', { name: 'Option 3' });
    
    // Check if it has aria-disabled
    expect(option3.getAttribute('aria-disabled')).toBe('true');
    
    fireEvent.click(option3);
    
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('should be disabled when prop is set', () => {
    render(<Select options={options} disabled placeholder="Select" />);
    const trigger = screen.getByRole('combobox');
    expect(trigger.disabled).toBe(true);
  });

  it('should show error message', () => {
    render(<Select options={options} error="Required field" placeholder="Select" />);
    expect(screen.getByText('Required field')).toBeTruthy();
  });

  it('should apply custom class names', () => {
    render(<Select options={options} className="custom-class" placeholder="Select" />);
    const trigger = screen.getByRole('combobox');
    expect(trigger.className).toContain('custom-class');
  });
});
