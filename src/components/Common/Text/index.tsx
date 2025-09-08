import React, { forwardRef } from 'react';
import { TextProps, Text as ChakraText } from '@chakra-ui/layout';
import { useTranslation } from 'next-i18next';

type Props = TextProps & {
  translateText?: string;
  variables?: any;
  children?: React.ReactNode;
};

const Text = forwardRef<HTMLDivElement, Props>(
  ({ translateText, children, variables, ...props }, ref) => {
    const { t } = useTranslation();

    if (translateText) {
      return (
        <ChakraText {...props} ref={ref}>
          {t(translateText, variables)}
        </ChakraText>
      );
    }

    return (
      <ChakraText {...props} ref={ref}>
        {children}
      </ChakraText>
    );
  }
);

export default Text;
