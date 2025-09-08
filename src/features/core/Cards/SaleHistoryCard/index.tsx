import React from 'react';
import { Box } from '@chakra-ui/react';
import _ from 'lodash';

import {
  CardAnimation,
  CardImageLoader,
  TextOneLine,
  Text,
  AvgCapScoreAndBonus,
} from '@/components/Common';
import { MySaleHistoryItem } from '@/typings/card';
import { getFullName } from '@/utils/user';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';

type Props = {
  item: MySaleHistoryItem;
};

const SaleHistoryCard = ({ item }: Props) => {
  const handleNavigateDetailUser = () => {
    const path = `${PATH.USER}/${item?.toUser?.id}`;
    navigateTo(path);
  };

  return (
    <CardAnimation>
      <Box
        bg="cardOverlay"
        p={[2, 3, 3]}
        borderRadius="xl"
        transition="all .2s"
        w="100%"
      >
        <CardImageLoader src={_.get(item, 'nft.imageUrl', '')} />
        <Box mt={4}>
          <AvgCapScoreAndBonus item={item} />
        </Box>
        <Text fontWeight="bold" mt={2} textAlign="center">
          ${item?.amount}
        </Text>
        <TextOneLine
          fontSize="sm"
          color="gray.200"
          maxW="200px"
          value={`To user: ${getFullName(item.toUser)}`}
          textAlign="center"
          mx="auto"
          cursor="pointer"
          onClick={handleNavigateDetailUser}
          _hover={{ color: 'primary.500' }}
        />
      </Box>
    </CardAnimation>
  );
};

export default SaleHistoryCard;
