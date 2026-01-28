
import { useCallback } from 'react';

export interface UseFormProps {
  onSubmit?: (data?: Record<string, any>) => void;
}

export function useForm(props: UseFormProps = {}) {
  const { onSubmit } = props;

  const handleSubmit = useCallback(() => {
    // In a real implementation, this would collect form data from fields
    // For this simplified version, we just call the onSubmit handler
    onSubmit?.();
  }, [onSubmit]);

  return {
    handlers: {
      handleSubmit,
    },
  };
}
