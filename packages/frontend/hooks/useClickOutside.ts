import { useCallback, useEffect, useRef } from 'react';

export const useClickOutside = (onClose: () => void) => {
  const ref = useRef<HTMLElement>(null);

  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, []);

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || !ref.current.contains(e.target as HTMLElement)) {
        onClose();
      }
    },
    [ref.current]
  );

  useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, []);

  return ref;
};
