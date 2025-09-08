import React from 'react';
import { Box } from '@chakra-ui/react';

import Image from 'next/image';

import colors from '@/theme/foundations/colors';
import { DataGrid } from '@/components/Common';
import {
  INVITE_FRIEND_BLUE_CARD1,
  INVITE_FRIEND_BLUE_CARD2,
  INVITE_FRIEND_RED_CARD,
  INVITE_FRIEND_YELLOW_CARD,
} from '@/constants/images';

type CardItemProps = {
  id?: string;
  image: string;
  transform?: string;
};

const images: CardItemProps[] = [
  {
    id: '1',
    image: INVITE_FRIEND_RED_CARD,
    transform: 'rotate(10deg)',
  },
  {
    id: '2',
    image: INVITE_FRIEND_BLUE_CARD1,
    transform: 'rotate(350deg)',
  },
  {
    id: '3',
    image: INVITE_FRIEND_YELLOW_CARD,
    transform: 'rotate(10deg)',
  },
  {
    id: '4',
    image: INVITE_FRIEND_BLUE_CARD2,
    transform: 'rotate(350deg)',
  },
];

const CardItem = ({ image, transform }: CardItemProps) => {
  return (
    <Box
      transform={transform}
      width={['120px', '120px', '120px', '180px']}
      height={['180px', '180px', '180px', '280px']}
      position="relative"
    >
      <Image src={image} layout="fill" />
    </Box>
  );
};

const Cards = () => {
  return (
    <Box
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        width: '400px',
        height: '400px',
        top: -6,
        left: -200,
        background: `linear-gradient(90deg, ${colors.whiteAlpha[950]} 0%, ${colors.backAlpha[0]} 100%)`,
        zIndex: '1',
      }}
      _after={{
        content: '""',
        position: 'absolute',
        width: '400px',
        height: '400px',
        top: -6,
        right: -200,
        background: `linear-gradient(90deg, ${colors.backAlpha[0]} 0%, ${colors.whiteAlpha[950]} 100%)`,
        zIndex: '1',
      }}
      maxWidth={1000}
      margin="auto"
    >
      <DataGrid
        columns={4}
        gap={20}
        data={images}
        renderItem={(record) => (
          <CardItem
            key={record.id}
            image={record.image}
            transform={record.transform}
          />
        )}
      />
    </Box>
  );
};

export default Cards;
