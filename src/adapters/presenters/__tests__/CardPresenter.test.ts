import { describe, it, expect } from 'bun:test';
import { CardEntity } from '../../../domain/entities/card/CardState';
import { CardPresenter } from '../CardPresenter';

describe('CardPresenter', () => {
  const presenter = new CardPresenter();

  it('should present card', () => {
    const entity = CardEntity.create({ variant: 'elevated' });
    const vm = presenter.present(entity);
    expect(vm.variant).toBe('elevated');
    expect(vm.styles.shadow).not.toBe('none');
  });

  it('should set role when interactive', () => {
    const entity = CardEntity.create({ interactive: true });
    const vm = presenter.present(entity);
    expect(vm.role).toBe('button');
  });
});
