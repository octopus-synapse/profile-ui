

import { describe, it, expect } from 'bun:test';
import { EmptyStateController } from '../EmptyStateController';

describe('EmptyStateController', () => {
  it('should create with required title', () => {
    const controller = new EmptyStateController({ title: 'No items found' });
    const viewModel = controller.getViewModel();

    expect(viewModel.title).toBe('No items found');
    expect(viewModel.description).toBeNull();
    expect(viewModel.size).toBe('md');
  });

  it('should throw error without title', () => {
    expect(() => {
      new EmptyStateController({ title: '' });
    }).toThrow('EmptyState must have a non-empty title');
  });

  it('should create with description', () => {
    const controller = new EmptyStateController({
      title: 'Empty',
      description: 'No data available',
    });
    const viewModel = controller.getViewModel();

    expect(viewModel.description).toBe('No data available');
  });

  it('should update title', () => {
    const controller = new EmptyStateController({ title: 'Old' });
    
    controller.setTitle('New Title');
    const viewModel = controller.getViewModel();

    expect(viewModel.title).toBe('New Title');
  });

  it('should update description', () => {
    const controller = new EmptyStateController({ title: 'Empty' });
    
    controller.setDescription('Added description');
    const viewModel = controller.getViewModel();

    expect(viewModel.description).toBe('Added description');
  });

  it('should handle icon state', () => {
    const controller = new EmptyStateController({
      title: 'Empty',
      hasIcon: true,
    });
    const viewModel = controller.getViewModel();

    expect(viewModel.hasIcon).toBe(true);
  });

  it('should update hasIcon', () => {
    const controller = new EmptyStateController({ title: 'Empty' });
    
    controller.setHasIcon(true);
    const viewModel = controller.getViewModel();

    expect(viewModel.hasIcon).toBe(true);
  });

  it('should handle action state', () => {
    const controller = new EmptyStateController({
      title: 'Empty',
      hasAction: true,
    });
    const viewModel = controller.getViewModel();

    expect(viewModel.hasAction).toBe(true);
    expect(viewModel.interactive).toBe(true);
  });

  it('should update hasAction', () => {
    const controller = new EmptyStateController({ title: 'Empty' });
    
    controller.setHasAction(true);
    const viewModel = controller.getViewModel();

    expect(viewModel.hasAction).toBe(true);
  });

  it('should handle action trigger', async () => {
    const controller = new EmptyStateController({
      title: 'Empty',
      hasAction: true,
    });
    let actionCalled = false;

    await controller.onAction(() => {
      actionCalled = true;
    });

    expect(actionCalled).toBe(true);
  });

  it('should throw error when triggering action without hasAction', async () => {
    const controller = new EmptyStateController({
      title: 'Empty',
      hasAction: false,
    });

    expect(async () => {
      await controller.onAction();
    }).toThrow();
  });

  it('should handle different sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      const controller = new EmptyStateController({ title: 'Empty', size });
      const viewModel = controller.getViewModel();
      expect(viewModel.size).toBe(size);
    });
  });

  it('should update size', () => {
    const controller = new EmptyStateController({ title: 'Empty', size: 'sm' });
    
    controller.setSize('lg');
    const viewModel = controller.getViewModel();

    expect(viewModel.size).toBe('lg');
    expect(viewModel.styles.padding).toBe(64);
  });

  it('should apply correct size tokens', () => {
    const controller = new EmptyStateController({ title: 'Empty', size: 'lg' });
    const viewModel = controller.getViewModel();

    expect(viewModel.styles).toMatchObject({
      padding: 64,
      iconSize: 40,
      titleSize: 20,
      descriptionSize: 16,
    });
  });

  it('should have accessibility role', () => {
    const controller = new EmptyStateController({ title: 'Empty' });
    const viewModel = controller.getViewModel();

    expect(viewModel.role).toBe('status');
  });
});
