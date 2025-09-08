import React, { useEffect } from 'react';
import { TextProps, Text, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

type Props = TextProps & {
  value: string;
  tooltipValue?: string;
};

const TextOneLine = ({ value, tooltipValue, ...props }: Props) => {
  const { t } = useTranslation();
  const textRef = React.useRef<HTMLDivElement>(null);
  const [isTextOverflowing, setIsTextOverflowing] = React.useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsTextOverflowing(
        textRef.current.scrollWidth > textRef.current.clientWidth
      );
    }
  }, [value, tooltipValue]);

  return (
    <Tooltip label={isTextOverflowing ? t(tooltipValue || value) : ''} hasArrow>
      <Text
        ref={textRef}
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
        flex={1}
        {...props}
      >
        {t(value)}
      </Text>
    </Tooltip>
  );
};

export default TextOneLine;
