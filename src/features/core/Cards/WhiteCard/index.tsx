import React from 'react';
import { Box } from '@chakra-ui/react';

import { CardAnimation, TextOneLine } from '@/components/Common';
import CardImageLoader from '@/components/Common/CardImageLoader';
import { CardItem } from '@/typings/card';

type Props = {
  item: CardItem;
};

const WhiteCard = ({ item }: Props) => {
  return (
    <CardAnimation>
      <Box bg="gray.100" p={[2, 2, 3]} borderRadius="xl" transition="all .2s">
        <CardImageLoader src={item.imageUrl} />
        <TextOneLine
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
          color="gray.900"
          maxW="200px"
          margin="auto"
          mt={4}
          value={item?.name}
        />
      </Box>
    </CardAnimation>
  );
};

export default WhiteCard;
