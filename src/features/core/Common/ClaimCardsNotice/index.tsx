import { Box, Flex, Icon } from '@chakra-ui/react';
import { useSize } from '@chakra-ui/react-use-size';
import React, { useRef } from 'react';
import _ from 'lodash';
import { MdCardGiftcard } from 'react-icons/md';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';

import TransferCard from './TransferCard';

import { Text, TextOneLine } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { REWARD } from '@/constants/images';
import { useGetUserProfile } from '@/queries/useUser';
import { FreeCardsTeamStatusEnum } from '@/typings/user.enum';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';

const PARENT_WIDTH = 540;

const ClaimCardsNotice = () => {
  const { data: user } = useGetUserProfile();
  const { t } = useTranslation();
  const elementRef = useRef<any>();
  const dimensions = useSize(elementRef);

  const width = _.get(dimensions, 'width', 0);

  if (user && user.freeCardsTeamStatus === FreeCardsTeamStatusEnum.DONE) {
    return <TransferCard />;
  }

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
            translateText="you_got_some_free_cards"
          />
          <Text
            fontSize="md"
            color="gray.400"
            textAlign={width < PARENT_WIDTH ? 'center' : 'left'}
            translateText="cylimit_rewards_you_free_cards_to_start_being_a_manager"
          />
        </Box>
      </Flex>
      <Box
        flexShrink={0}
        mx={width < PARENT_WIDTH ? 'auto' : 'none'}
        maxW="100%"
      >
        <BaseButton
          variant="purple-gradient"
          size="md"
          leftIcon={<Icon as={MdCardGiftcard} />}
          onClick={() => navigateTo(PATH.TAKE_FREE_CARDS)}
          maxW="100%"
        >
          <TextOneLine value={t('go_to_claim')} />
        </BaseButton>
      </Box>
    </Flex>
  );
};

export default ClaimCardsNotice;
