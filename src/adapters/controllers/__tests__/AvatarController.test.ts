import { describe, it, expect } from 'bun:test';
import { AvatarController } from '../AvatarController';

describe('AvatarController', () => {
  it('should create with default state', () => {
    const controller = new AvatarController({});
    const vm = controller.getViewModel();
    expect(vm.size).toBe('md');
    expect(vm.shape).toBe('circle');
    expect(vm.hasImage).toBe(false);
  });

  it('should get initials from name', () => {
    const controller = new AvatarController({});
    expect(controller.getInitials('John Doe')).toBe('JD');
    expect(controller.getInitials('Alice')).toBe('AL');
  });

  it('should handle image error', () => {
    const controller = new AvatarController({ src: 'https://example.com/avatar.png' });
    expect(controller.getViewModel().hasImage).toBe(true);
    controller.onImageError();
    expect(controller.getViewModel().hasImage).toBe(false);
  });

  it('should update size', () => {
    const controller = new AvatarController({});
    controller.setSize('lg');
    expect(controller.getViewModel().styles.dimension).toBe(48);
  });

  it('should handle status', () => {
    const controller = new AvatarController({ status: 'online' });
    const vm = controller.getViewModel();
    expect(vm.hasStatus).toBe(true);
    expect(vm.statusStyles?.color).toBe('#22c55e');
  });
});
