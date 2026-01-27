

import { describe, it, expect } from 'bun:test';
import { SpinnerEntity } from '../../../domain/entities/spinner/SpinnerState';
import { SpinnerPresenter } from '../SpinnerPresenter';

describe('SpinnerPresenter', () => {
  const presenter = new SpinnerPresenter();

  it('should present default spinner', () => {
    const entity = SpinnerEntity.create({});
    const viewModel = presenter.present(entity);

    expect(viewModel.size).toBe('md');
    expect(viewModel.colorScheme).toBe('default');
    expect(viewModel.ariaLabel).toBe('Loading');
  });

  it('should present large accent spinner', () => {
    const entity = SpinnerEntity.create({
      size: 'lg',
      colorScheme: 'accent',
    });

    const viewModel = presenter.present(entity);

    expect(viewModel.size).toBe('lg');
    expect(viewModel.styles.size).toBe(32);
    expect(viewModel.styles.color).toBe('#06b6d4');
    expect(viewModel.styles.strokeWidth).toBe(3);
  });

  it('should present spinner with custom label', () => {
    const entity = SpinnerEntity.create({ label: 'Uploading files...' });
    const viewModel = presenter.present(entity);

    expect(viewModel.ariaLabel).toBe('Uploading files...');
  });

  it('should include accessibility attributes', () => {
    const entity = SpinnerEntity.create({});
    const viewModel = presenter.present(entity);

    expect(viewModel.role).toBe('status');
    expect(viewModel.ariaLive).toBe('polite');
  });

  it('should apply design tokens correctly', () => {
    const entity = SpinnerEntity.create({ size: 'xs', colorScheme: 'muted' });
    const viewModel = presenter.present(entity);

    expect(viewModel.styles).toEqual({
      size: 12,
      color: '#a3a3a3',
      strokeWidth: 2,
    });
  });
});
