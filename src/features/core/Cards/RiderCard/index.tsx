import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';

import { Favorite } from '@/features/core/Common';
import { CardItem } from '@/typings/card';
import {
  Text,
  AvgCapScoreAndBonus,
  JerseyWithSponsor,
} from '@/components/Common';
import CardImageLoader from '@/components/Common/CardImageLoader';
import { MarketType } from '@/typings/card.enum';
import { getFullName } from '@/utils/user';
import { Sponsor } from '@/typings/user.enum';
import { getTemplatePath } from '@/utils/string';
import { PATH } from '@/constants/path';

type Props = {
  item: CardItem;
  riderId: string;
};

const RiderCard = ({ item, riderId }: Props) => {
  const { jersey, primaryColor, secondaryColor, sponsor } = item?.owner || {};

  return (
    <Box
      bg="cardOverlay"
      p={[2, 2, 3]}
      borderRadius="3xl"
      transition="all .2s"
      w="100%"
      h="100%"
    >
      <Link href={getTemplatePath(PATH.CARD_DETAILS, { id: item.id })} passHref>
        <Box as="a" cursor="pointer">
          <CardImageLoader src={item?.imageUrl} mb="10px" />
        </Box>
      </Link>
      <AvgCapScoreAndBonus item={item} />
      <Flex height="30px" justifyContent="center" mt={2}>
        <Favorite riderId={riderId} />
      </Flex>
      {item?.marketType === MarketType.OWNER && (
        <Flex alignItems="center" justifyContent="center" gap="8px">
          <Text textAlign="center" fontWeight="bold" fontSize="xs">
            {getFullName(item?.owner)}
          </Text>
          {jersey && primaryColor && secondaryColor ? (
            <JerseyWithSponsor
              jersey={jersey}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              sponsor={sponsor as Sponsor}
              width={['16px', '24px']}
              height={['16px', '24px']}
            />
          ) : null}
        </Flex>
      )}
    </Box>
  );
};

export default RiderCard;
