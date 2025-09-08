import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';

import { Text } from '@/components/Common';
import { MarketType, TransferStatus } from '@/typings/card.enum';
import { MyCardItem } from '@/typings/card';
import { checkExpiredTime } from '@/utils/date';

type Props = {
  item: MyCardItem;
};

export const Status = ({ item }: Props) => {
  const isExpiredTime = checkExpiredTime(item.fixedEndDate);

  const { t } = useTranslation();

  const transferStatuses = [TransferStatus.WAITING, TransferStatus.PROCESSING];

  const MAP_STATUS_TEXT: { [key in string]: string } = {
    [TransferStatus.WAITING]: t('transfering'),
    [TransferStatus.PROCESSING]: t('transfering'),
  };

  const transferStatus = _.get(
    _.last(item.sales),
    'transferStatus'
  ) as TransferStatus;

  if (transferStatuses.includes(transferStatus)) {
    return (
      <Text
        color="white"
        bg="gray.500"
        display="inline-block"
        px={3}
        py={0.5}
        borderRadius="md"
        textTransform="capitalize"
        translateText={MAP_STATUS_TEXT[transferStatus]}
      />
    );
  }

  return (
    <React.Fragment>
      {item.marketType === MarketType.FIXED ? (
        <Flex alignItems="center">
          <Text
            color="black"
            bg="secondary.400"
            display="inline"
            px={3}
            py={0.5}
            borderRadius="md"
            mr={2}
            fontSize={['xs', 'sm']}
            translateText={isExpiredTime ? 'expired_sell' : 'sell'}
          />
          <Text fontSize={['xs', 'sm']} translateText="fixed_price" />
        </Flex>
      ) : (
        <Text
          color="white"
          bg="success.500"
          display="inline-block"
          px={3}
          py={0.5}
          borderRadius="md"
          translateText="available"
        />
      )}
    </React.Fragment>
  );
};
