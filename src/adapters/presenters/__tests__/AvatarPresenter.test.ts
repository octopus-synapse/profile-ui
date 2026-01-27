import { describe, it, expect } from 'bun:test';
import { AvatarEntity } from '../../../domain/entities/avatar/AvatarState';
import { AvatarPresenter } from '../AvatarPresenter';

describe('AvatarPresenter', () => {
  const presenter = new AvatarPresenter();

  it('should present avatar with image', () => {
    const entity = AvatarEntity.create({ src: 'test.jpg', alt: 'User' });
    const vm = presenter.present(entity);
    expect(vm.hasImage).toBe(true);
    expect(vm.src).toBe('test.jpg');
  });

  it('should present avatar with status', () => {
    const entity = AvatarEntity.create({ status: 'away' });
    const vm = presenter.present(entity);
    expect(vm.statusStyles?.color).toBe('#f59e0b');
  });

  it('should apply size tokens', () => {
    const entity = AvatarEntity.create({ size: 'xl' });
    const vm = presenter.present(entity);
    expect(vm.styles.dimension).toBe(64);
    expect(vm.styles.fontSize).toBe(18);
  });
});
