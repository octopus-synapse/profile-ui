

import { describe, it, expect } from 'bun:test';
import { SeparatorEntity } from '../../../domain/entities/separator/SeparatorState';
import { SeparatorPresenter } from '../SeparatorPresenter';

describe('SeparatorPresenter', () => {
  const presenter = new SeparatorPresenter();

  it('should present horizontal decorative separator', () => {
    const entity = SeparatorEntity.create({
      orientation: 'horizontal',
      decorative: true,
    });

    const viewModel = presenter.present(entity);

    expect(viewModel.orientation).toBe('horizontal');
    expect(viewModel.decorative).toBe(true);
    expect(viewModel.role).toBe('none');
    expect(viewModel.ariaOrientation).toBeUndefined();
  });

  it('should present vertical non-decorative separator', () => {
    const entity = SeparatorEntity.create({
      orientation: 'vertical',
      decorative: false,
    });

    const viewModel = presenter.present(entity);

    expect(viewModel.orientation).toBe('vertical');
    expect(viewModel.decorative).toBe(false);
    expect(viewModel.role).toBe('separator');
    expect(viewModel.ariaOrientation).toBe('vertical');
  });

  it('should include design tokens in styles', () => {
    const entity = SeparatorEntity.create({});
    const viewModel = presenter.present(entity);

    expect(viewModel.styles).toEqual({
      color: 'rgba(255,255,255,0.1)',
      thickness: 1,
    });
  });
});
