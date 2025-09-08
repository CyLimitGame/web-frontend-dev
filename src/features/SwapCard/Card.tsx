import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import Image from 'next/image';
import _ from 'lodash';

import {
  AvgCapScoreAndBonus,
  MotionBox,
  TextOneLine,
} from '@/components/Common';
import { NO_CARD, SKELETON } from '@/constants/images';

type Props = Omit<BoxProps, 'onClick'> & {
  checked: boolean;
  onClick?: (card: any) => void;
  item: {
    level: number;
    rarity: string;
    id: string;
    imageUrl: string;
    name: string;
  };
  isShowTeam?: boolean;
};

const Card = ({ onClick, checked, item, isShowTeam, ...props }: Props) => {
  return (
    <Box
      border="1px solid"
      borderColor={checked ? 'gray.200' : 'transparent'}
      p={1}
      overflow="hidden"
      borderRadius="xl"
      _hover={{ transform: 'scale(1.02)' }}
      cursor="pointer"
      pos="relative"
      transition="all .2s"
      {...props}
      onClick={() => (onClick ? onClick(item) : undefined)}
    >
      <MotionBox
        sx={{ aspectRatio: '0.7' }}
        borderRadius="xl"
        position="relative"
        overflow="hidden"
      >
        <Image
          src={item?.imageUrl || NO_CARD}
          layout="fill"
          placeholder="blur"
          blurDataURL={SKELETON}
        />
      </MotionBox>
      <Box mt={2}>
        <AvgCapScoreAndBonus item={_.get(item, 'riderId')} />
      </Box>
      {isShowTeam && (
        <TextOneLine
          value={_.get(item, 'riderId.actualTeam.name', '')}
          fontSize="xs"
          fontWeight="bold"
          textAlign="center"
          mt={1}
        />
      )}
    </Box>
  );
};

export default Card;
