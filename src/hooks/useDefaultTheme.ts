import { useEffect } from 'react';

export const useDefaultTheme = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('chakra-ui-color-mode');
      if (theme !== 'dark') {
        localStorage.setItem('chakra-ui-color-mode', 'dark');
        window.location.reload();
      }
    }
  }, []);
};
