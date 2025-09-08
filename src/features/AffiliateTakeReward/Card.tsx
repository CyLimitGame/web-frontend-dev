import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import NextImage from 'next/image';

import { MotionBox, Ribon } from '@/components/Common';
import { BLUE_CARD } from '@/constants/images';

export type RewardItem = {
  value: string | number;
  rarity?: string;
};

type Props = {
  item: RewardItem;
  delay: number;
  onFlip: () => void;
  onSelect: () => void;
  isSelected: boolean;
};

const Card = ({ item, onFlip, onSelect, delay, isSelected }: Props) => {
  const [rotateY, setRotateY] = useState(180);

  const handleToggle = () => {
    if (rotateY) {
      setRotateY(0);
      onFlip();
    }
  };

  return (
    <>
      <MotionBox
        onClick={handleToggle}
        initial={{ x: 8000 }}
        animate={{ x: 0, rotateY }}
        transition={{
          x: {
            duration: 1,
            delay,
          },
          rotateY: {
            duration: 0.2,
          },
        }}
      >
        <Box
          sx={{ aspectRatio: '0.7' }}
          bg="gray.100"
          borderRadius="3xl"
          position="relative"
          overflow="hidden"
          cursor="pointer"
          transition="transform 0.2s"
          _hover={{ transform: 'scale(1.02)' }}
          w="240px"
        >
          {!rotateY && isSelected && <Ribon label="selected" />}
          <MotionBox
            w="100%"
            h="100%"
            animate={{ rotateY }}
            opacity={rotateY ? 0 : 1}
            onClick={onSelect}
          >
            <NextImage src={item.value as string} layout="fill" />
          </MotionBox>
          <Box display={rotateY ? 'block' : 'none'}>
            <NextImage src={BLUE_CARD} layout="fill" />
          </Box>
        </Box>
      </MotionBox>
    </>
  );
};

export default Card;
