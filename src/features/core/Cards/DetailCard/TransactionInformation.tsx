import { Box, Flex, Icon, Stack, useClipboard } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { FiCopy } from 'react-icons/fi';
import { AiOutlineLink } from 'react-icons/ai';

import { ViewRiderCollections } from '@/features/core/Common';
import { Text } from '@/components/Common';
import { shortAddress } from '@/utils/common';
import { useToastMessage } from '@/hooks/useToastMessage';
import { NEXT_PUBLIC_POLYGON_SCAN } from '@/config/appConfig';
import { UserNameField } from '@/features/core/Field';
import { User } from '@/typings/auction';

type ItemProps = {
  label?: string;
  value?: string;
  text?: React.ReactNode;
  backgroundColor?: string;
  isCoppy?: boolean;
  isLink?: boolean;
};

const Item = ({
  label,
  value,
  text,
  backgroundColor,
  isCoppy,
  isLink,
}: ItemProps) => {
  const { t } = useTranslation();
  const { onCopy, setValue } = useClipboard(value || '');
  const toast = useToastMessage();

  const handleCopyCode = () => {
    onCopy();
    toast({
      position: 'top-right',
      description: t('copied'),
      status: 'success',
    });
  };

  const handleShowNetworkScan = () => {
    window.open(`${NEXT_PUBLIC_POLYGON_SCAN}/address/${value}`, '_blank');
  };

  useEffect(() => {
    setValue(value || '');
  }, [value]);

  return (
    <Flex alignItems="center">
      <Box
        width="8px"
        height="8px"
        borderRadius="50%"
        backgroundColor={backgroundColor}
      />
      <Text color="gray.400" mx={[2, 4]} fontSize={['sm', 'lg']}>
        {t(label || '')}:
      </Text>
      {typeof text === 'string' ? (
        <Text color="gray.900" fontWeight="bold" fontSize={['sm', 'md']}>
          {text}
        </Text>
      ) : (
        text
      )}
      {isCoppy && (
        <Icon
          as={FiCopy}
          color="gray.400"
          cursor="pointer"
          ml={4}
          onClick={handleCopyCode}
        />
      )}
      {isLink && (
        <Icon
          as={AiOutlineLink}
          color="gray.400"
          cursor="pointer"
          ml={4}
          onClick={handleShowNetworkScan}
        />
      )}
    </Flex>
  );
};

type Props = {
  contractAddress?: string;
  tokenId?: string;
  owner: User;
  riderId: string;
};

const TransactionInformation = ({
  contractAddress,
  tokenId,
  owner,
  riderId,
}: Props) => {
  return (
    <Stack spacing={2}>
      <Item
        label="contract_address"
        value={contractAddress}
        text={shortAddress(contractAddress || '')}
        backgroundColor="secondary.500"
        isCoppy
        isLink
      />
      <Item
        label="token_id"
        value={tokenId}
        text={tokenId}
        backgroundColor="primary.500"
        isCoppy
      />
      <Item
        label="owner"
        text={<UserNameField user={owner} />}
        backgroundColor="error.500"
      />
      <Item
        label="rider_collections"
        text={<ViewRiderCollections riderId={riderId} />}
        backgroundColor="success.500"
      />
    </Stack>
  );
};

export default TransactionInformation;
