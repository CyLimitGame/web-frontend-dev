import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import Image from 'next/image';

import { XP_FRONT } from '@/constants/images';
import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { AffiliateReward } from '@/typings/affiliate';
import { useAffiliateClaimReward } from '@/queries/useAffiliate';

type Props = {
  data?: AffiliateReward;
};

const XpReward = ({ data }: Props) => {
  const { t } = useTranslation();

  const { mutate, isLoading } = useAffiliateClaimReward();

  const handleClaim = () => {
    mutate({ rewardId: data?.id as string });
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Box
        sx={{ aspectRatio: '0.7' }}
        bg="gray.100"
        borderRadius="2xl"
        position="relative"
        overflow="hidden"
        cursor="pointer"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.02)' }}
        w="240px"
      >
        <Image layout="fill" src={XP_FRONT} />
        <Text
          mt={2}
          fontSize="2xl"
          fontWeight="bold"
          pos="absolute"
          zIndex="docked"
          bottom="60px"
          left="50%"
          background="white"
          w="80%"
          borderRadius="2xl"
          py={2}
          textAlign="center"
          border="4px solid black"
          transform="translateX(-50%)"
        >
          {data?.rewardXP}
        </Text>
      </Box>
      <BaseButton mt={4} onClick={handleClaim} isLoading={isLoading}>
        {t('claim')}
      </BaseButton>
    </Flex>
  );
};

export default XpReward;
