import { describe, it, expect } from 'bun:test';
import { LoadingStateController } from '../LoadingStateController';

describe('LoadingStateController', () => {
  it('should create with idle state', () => {
    const controller = new LoadingStateController({});
    const vm = controller.getViewModel();
    expect(vm.variant).toBe('idle');
  });

  it('should transition states', () => {
    const controller = new LoadingStateController({});
    controller.transitionTo('loading', 'Processing...');
    expect(controller.getViewModel().variant).toBe('loading');
    expect(controller.getViewModel().message).toBe('Processing...');
  });

  it('should detect error state', () => {
    const controller = new LoadingStateController({ variant: 'error' });
    expect(controller.getViewModel().hasError).toBe(true);
  });
});
