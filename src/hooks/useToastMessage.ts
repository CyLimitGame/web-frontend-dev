import { useToast, UseToastOptions } from '@chakra-ui/toast';

export const useToastMessage = () => {
  const toast = useToast();
  return (options?: UseToastOptions) =>
    toast({
      duration: 5000,
      isClosable: true,
      position: 'top-right',
      ...options,
    });
};
