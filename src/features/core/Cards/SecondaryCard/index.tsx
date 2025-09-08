import React from 'react';
import { Box, BoxProps, Text } from '@chakra-ui/react';
import _ from 'lodash';
import Link from 'next/link';

import BaseCard from '../BaseCard';

import { CardItem as CardItemProps } from '@/typings/card';
import { BuyButton } from '@/features/core/Button';
import { Favorite } from '@/features/core/Common';
import { formatPrice } from '@/utils/number';
import { getTemplatePath } from '@/utils/string';
import { PATH } from '@/constants/path';

type Props = BoxProps & {
  item: CardItemProps;
  isHoverPrice?: boolean;
};

const SecondaryCard = ({ item, isHoverPrice, ...props }: Props) => {
  const price = _.get(item, 'fixedPrice');

  return (
    <Box
      bg="input"
      p={[2, 3, 3]}
      borderRadius={['2xl', '2xl', '3xl']}
      {...props}
    >
      <Link href={getTemplatePath(PATH.CARD_DETAILS, { id: item.id })} passHref>
        <Box as="a" cursor="pointer">
          <BaseCard data={item} isShowPrice={isHoverPrice} />
        </Box>
      </Link>
      <Box pos="relative">
        <Text
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
          color="error.400"
          mt={2}
        >
          ${formatPrice(price)}
        </Text>
        <Box pos="absolute" top={0} right={0}>
          <Favorite riderId={item.riderId} />
        </Box>
      </Box>
      <Box textAlign="center" pt={[2, 2, 4]}>
        <BuyButton item={item} w="100%" />
      </Box>
    </Box>
  );
};

export default SecondaryCard;
