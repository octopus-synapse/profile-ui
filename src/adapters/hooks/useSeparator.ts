import { SeparatorProps, separatorTokens } from '../../shared/separator/separator.types';

export function useSeparator(props: Partial<SeparatorProps> = {}) {
  const { orientation = 'horizontal', decorative = true } = props;

  return {
    state: {
      orientation,
      decorative,
    },
    styles: {
      color: separatorTokens.color,
      thickness: separatorTokens.thickness,
    },
    accessibility: {
      role: decorative ? 'none' : 'separator',
      'aria-orientation': orientation,
    }
  };
}
