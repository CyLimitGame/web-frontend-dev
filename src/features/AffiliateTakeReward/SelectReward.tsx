import React, { useState } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';

import Image from 'next/image';

import { BLUE_CARD, XP_BACK } from '@/constants/images';
import { Ribon, Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { RewardTypeEnum } from '@/typings/affiliate.enum';
import useParamsQuery from '@/hooks/useGetParams';
import {
  useGetAffiliateRewardSetting,
  useTakeReferredReward,
} from '@/queries/useAffiliate';
import { useGetUserProfile } from '@/queries/useUser';
import { ConfirmModal } from '@/components/Modal';

const SelectReward = () => {
  const { getParam } = useParamsQuery();
  const { data: profileInfo } = useGetUserProfile();
  const id = getParam('id');
  const { data: rewardSetting } = useGetAffiliateRewardSetting();
  const totalXp = _.get(rewardSetting, 'xp', 0);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { t } = useTranslation();
  const [rewardType, setRewardType] = useState<RewardTypeEnum>();

  const { mutateAsync, isLoading } = useTakeReferredReward();
  const handleTakeReward = async () => {
    await mutateAsync({
      friendId: profileInfo?.id === id ? undefined : id,
      rewardType: rewardType as RewardTypeEnum,
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Text
        translateText="choose_your_reward"
        textAlign="center"
        fontSize="2xl"
        color="gray.500"
        fontWeight="bold"
        mt={4}
        mb={10}
      />
      <Flex gap={5} flexDirection={['column', 'column', 'row']}>
        <Box>
          <Text textAlign="center" mb={2} fontWeight="bold" color="gray.400">
            {totalXp} XP
          </Text>
          <Box
            sx={{ aspectRatio: '0.7' }}
            w="240px"
            bg="gray.100"
            borderRadius="3xl"
            position="relative"
            overflow="hidden"
            cursor="pointer"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.02)' }}
            onClick={() => setRewardType(RewardTypeEnum.XP)}
          >
            {rewardType === RewardTypeEnum.XP && <Ribon label="selected" />}
            <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
              <Image src={XP_BACK} layout="fill" />
            </Flex>
          </Box>
        </Box>
        <Box>
          <Text
            textAlign="center"
            mb={2}
            fontWeight="bold"
            color="gray.400"
            translateText="random_blue_card"
          />
          <Box
            sx={{ aspectRatio: '0.7' }}
            w="240px"
            bg="gray.100"
            borderRadius="3xl"
            position="relative"
            overflow="hidden"
            cursor="pointer"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.02)' }}
            onClick={() => setRewardType(RewardTypeEnum.NFT)}
          >
            {rewardType === RewardTypeEnum.NFT && <Ribon label="selected" />}
            <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
              <Image src={BLUE_CARD} layout="fill" />
            </Flex>
          </Box>
        </Box>
      </Flex>
      <BaseButton
        mt={5}
        isDisabled={!rewardType}
        isLoading={isLoading}
        onClick={onOpen}
        variant="purple-gradient"
      >
        {t('take_reward')}
      </BaseButton>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleTakeReward}
      />
    </Box>
  );
};

export default SelectReward;
