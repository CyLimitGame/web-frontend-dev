import React, { useRef } from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { useSize } from '@chakra-ui/react-use-size';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { MdCardGiftcard } from 'react-icons/md';
import _ from 'lodash';
import moment from 'moment';

import { CountdownTime, Text, TextOneLine } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { REWARD } from '@/constants/images';
import { PATH } from '@/constants/path';
import { navigateTo } from '@/utils/navigation';
import { useGetTimeoutToTransferFreeCard } from '@/queries/useCard';

const PARENT_WIDTH = 540;

export const getTimeoutTransfer = (createdAt: string) => {
  const date = moment(createdAt);
  const now = moment(new Date().toISOString());

  const hoursDifference = now.diff(date, 'hours');
  const seconds = now.diff(date, 'seconds');

  if (createdAt && hoursDifference < 48) {
    return moment().add(48, 'hours').subtract(seconds, 'seconds');
  }
  return '';
};

const TransferCard = () => {
  const { t } = useTranslation();
  const elementRef = useRef<any>();
  const dimensions = useSize(elementRef);

  const width = _.get(dimensions, 'width', 0);

  const { data, refetch } = useGetTimeoutToTransferFreeCard();

  const timeout = getTimeoutTransfer(_.get(data, 'createdAt', ''));

  return (
    <Flex
      alignItems="center"
      shadow="md"
      borderRadius="xl"
      p={4}
      py={4}
      flexWrap="wrap"
      justifyContent="space-between"
      gap={3}
      ref={elementRef}
    >
      <Flex gap={4} alignItems="center" flexWrap="wrap">
        <Box mx="auto">
          <Image src={REWARD} width="50px" height="50px" />
        </Box>
        <Box>
          <Text
            fontSize="xl"
            fontWeight="bold"
            textAlign={width < PARENT_WIDTH ? 'center' : 'left'}
            translateText="transfer_card"
          />
          <Text
            fontSize="md"
            color="gray.400"
            textAlign={width < PARENT_WIDTH ? 'center' : 'left'}
            translateText="trade_in_a_free_card_for_a_new_one"
          />
        </Box>
      </Flex>
      <Box
        flexShrink={0}
        mx={width < PARENT_WIDTH ? 'auto' : 'none'}
        display={typeof data === 'undefined' ? 'none' : 'block'}
      >
        {!timeout ? (
          <BaseButton
            variant="purple-gradient"
            size="md"
            leftIcon={<Icon as={MdCardGiftcard} />}
            onClick={() => navigateTo(PATH.TRANSFER_FREE_CARD)}
          >
            <TextOneLine value={t('claim_now')} />
          </BaseButton>
        ) : (
          <Box>
            <Text
              textAlign="center"
              fontWeight="bold"
              translateText="next_transfer_in"
            />
            <Text color="error.500">
              <CountdownTime
                date={timeout as any}
                onComplete={() => refetch()}
              />
            </Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default TransferCard;
