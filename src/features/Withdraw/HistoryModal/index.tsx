import React, { useState } from 'react';
import { Box, Flex, Icon, ModalProps, useClipboard } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { FiCopy } from 'react-icons/fi';

import { BaseModal } from '@/components/Modal';
import { Pagination, Text } from '@/components/Common';
import { useGetWithdrawHistory } from '@/queries/useWithdraw';
import { shortAddress } from '@/utils/common';
import { useToastMessage } from '@/hooks/useToastMessage';
import { formatDateTime } from '@/utils/date';
import { WithdrawStatus } from '@/typings/withdraw.enum';

type Props = Omit<ModalProps, 'children'>;

type AddressProps = {
  address: string;
};

const statusColor = {
  [WithdrawStatus.ACCEPTED]: 'success.500',
  [WithdrawStatus.PENDING]: 'secondary.500',
  [WithdrawStatus.REJECTED]: 'error.500',
  [WithdrawStatus.VERIFYING]: 'secondary.500',
};

const Address = ({ address }: AddressProps) => {
  const { t } = useTranslation();
  const { onCopy } = useClipboard(address);
  const toast = useToastMessage();

  const handleCopyCode = () => {
    onCopy();
    toast({
      position: 'top-right',
      description: t('copied'),
      status: 'success',
    });
  };

  return (
    <Text flex={1}>
      {shortAddress(address)}
      <Icon
        as={FiCopy}
        color="gray.400"
        cursor="pointer"
        ml={4}
        onClick={handleCopyCode}
      />
    </Text>
  );
};

const HistoryModal = (props: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const { data } = useGetWithdrawHistory({ page, limit: 5 });

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <BaseModal {...props} title="history" size="xl" closeable>
      <Flex
        justifyContent="space-between"
        fontSize="sm"
        color="gray.500"
        gap={1}
      >
        <Text flex={1}>{t('amount')}</Text>
        <Text w="150px" display={['none', 'none', 'block']}>
          {t('date')}
        </Text>
        <Text flex={1}>{t('to_wallet')}</Text>
        <Text w="100px">{t('status')}</Text>
      </Flex>
      <Box fontSize="sm" gap={1}>
        {data?.items?.map((item) => (
          <Flex
            key={item.id}
            justifyContent="space-between"
            alignItems="center"
            py={1}
          >
            <Text flex={1}>${item.amount}</Text>
            <Text w="150px" display={['none', 'none', 'block']}>
              {formatDateTime(item.createdAt)}
            </Text>
            <Address address={item.toWallet} />
            <Text
              w="100px"
              textTransform="capitalize"
              color={statusColor[item.status]}
            >
              {item.status}
            </Text>
          </Flex>
        ))}
      </Box>
      <Pagination
        page={page || 1}
        total={data?.total || 0}
        limit={5}
        onChangePage={handleChangePage}
      />
    </BaseModal>
  );
};

export default HistoryModal;
