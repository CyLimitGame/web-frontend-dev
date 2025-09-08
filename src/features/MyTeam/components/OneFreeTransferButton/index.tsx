import React from 'react';
import { useTranslation } from 'next-i18next';
import { Center, Icon } from '@chakra-ui/react';
import { BsFillPlayBtnFill } from 'react-icons/bs';
import moment from 'moment';
import _ from 'lodash';

import { BaseButton } from '@/components/Button';
import { useGetTimeoutToTransferFreeCard } from '@/queries/useCard';
import { CountdownTime, Text } from '@/components/Common';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';

const getTimeoutTransfer = (createdAt: string) => {
  const date = moment(createdAt);
  const now = moment(new Date().toISOString());

  const hoursDifference = now.diff(date, 'hours');
  const seconds = now.diff(date, 'seconds');

  if (createdAt && hoursDifference < 48) {
    return moment().add(48, 'hours').subtract(seconds, 'seconds');
  }
  return '';
};

const OneFreeTransferButton = () => {
  const { t } = useTranslation();
  const { data, refetch } = useGetTimeoutToTransferFreeCard();
  const timeout = getTimeoutTransfer(_.get(data, 'createdAt', ''));

  return (
    <Center alignItems="center" gap={4}>
      <BaseButton
        rightIcon={<Icon as={BsFillPlayBtnFill} />}
        variant="light"
        isDisabled={!!timeout}
        onClick={() => navigateTo(PATH.TRANSFER_FREE_CARD)}
        size={['sm', 'sm', 'md']}
      >
        {t('one_free_transfer')}
      </BaseButton>
      <Text fontWeight="bold">
        <CountdownTime date={timeout as any} onComplete={() => refetch()} />
      </Text>
    </Center>
  );
};

export default OneFreeTransferButton;
