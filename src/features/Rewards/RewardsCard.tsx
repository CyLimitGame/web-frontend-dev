import React from 'react';
import { Box, ListItem, UnorderedList, Image } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { RewardsItem } from '@/typings/rewards';
import { Text } from '@/components/Common';
import {
  BRONZE_CUP,
  GOLD_CUP,
  REWARDS_BOX,
  SLIVER_CUP,
} from '@/constants/images';

type RewardsCardProps = {
  item: RewardsItem;
};

const RewardsCard = ({ item }: RewardsCardProps) => {
  const { t } = useTranslation();
  const { rank, rankLabel, point, items } = item;

  const getColor = () => {
    switch (rank) {
      case 1:
        return 'secondary.500';
      case 2:
      case 3:
        return 'pictonBlue.300';
      default:
        return 'success.500';
    }
  };

  const getRewardsIcon = () => {
    switch (rank) {
      case 1:
        return GOLD_CUP;
      case 2:
        return SLIVER_CUP;
      case 3:
        return BRONZE_CUP;
      default:
        return REWARDS_BOX;
    }
  };

  return (
    <Box
      height={150}
      bg={rank ? 'primary.500' : 'gray.100'}
      borderRadius="2xl"
      p={4}
      position="relative"
      overflow="hidden"
      cursor="pointer"
      transition="all .2s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'xs' }}
    >
      {rank ? (
        <Text
          bg="primary.500"
          color="white"
          display="inline-block"
          borderRadius="md"
          px={3}
          py={1}
          mb={3}
        >
          {rankLabel}
        </Text>
      ) : (
        <Text
          bg="pink.300"
          display="inline-block"
          color="white"
          borderRadius="md"
          px={3}
          py={1}
          mb={3}
        >
          {point}
        </Text>
      )}
      <UnorderedList>
        {Object.keys(items).map((key) => (
          <ListItem key={key} color={getColor()} fontWeight="bold">
            {`${items[key]} ${t(key)}`}
          </ListItem>
        ))}
      </UnorderedList>
      <Image src={getRewardsIcon()} position="absolute" right={0} bottom={0} />
    </Box>
  );
};

export default RewardsCard;
