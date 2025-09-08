import {
  Box,
  Flex,
  Icon,
  useClipboard,
  Link,
  LinkProps,
  FlexProps,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { FiCopy } from 'react-icons/fi';
import { AiOutlineLink } from 'react-icons/ai';

import { Text } from '@/components/Common';

import { useToastMessage } from '@/hooks/useToastMessage';

type Props = FlexProps & {
  valueCopy?: string;
  text?: React.ReactNode;
  href?: string;
  linkProps?: Omit<LinkProps, 'href'>;
};

const ClipboardAndLink = ({
  valueCopy,
  text,
  href,
  linkProps = {},
  ...rest
}: Props) => {
  const { t } = useTranslation();
  const { onCopy, setValue } = useClipboard(valueCopy || '');
  const toast = useToastMessage();

  const handleCopyCode = () => {
    onCopy();
    toast({
      position: 'top-right',
      description: t('copied'),
      status: 'success',
    });
  };

  useEffect(() => {
    setValue(valueCopy || '');
  }, [valueCopy]);

  return (
    <Flex alignItems="center" {...rest}>
      {typeof text === 'string' ? (
        <Text ml={2}>{text}</Text>
      ) : (
        <Box ml="3">{text}</Box>
      )}
      {!!valueCopy && (
        <Icon
          as={FiCopy}
          color="gray.400"
          cursor="pointer"
          ml={4}
          onClick={handleCopyCode}
        />
      )}
      {href && (
        <Link href={href} {...linkProps}>
          <Icon as={AiOutlineLink} color="gray.400" cursor="pointer" ml={4} />
        </Link>
      )}
    </Flex>
  );
};

export default ClipboardAndLink;
