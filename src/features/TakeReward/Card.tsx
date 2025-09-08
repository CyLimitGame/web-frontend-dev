import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import _ from 'lodash';
import NextImage from 'next/image';
import Head from 'next/head';

import Image from 'next/image';

import { MotionBox, Text } from '@/components/Common';
import {
  BLUE_CARD,
  RED_CARD,
  USDC_BACK,
  USDC_FRONT,
  XP_BACK,
  XP_FRONT,
  YELLOW_CARD,
} from '@/constants/images';

const MAP_RARITY = {
  blue: BLUE_CARD,
  pink: RED_CARD,
  yellow: YELLOW_CARD,
};

export enum RewardTypeEnum {
  NFT = 'nft',
  USDC = 'usdc',
  XP = 'xp',
}

export type RewardItem = {
  type: RewardTypeEnum;
  value: string | number;
  rarity?: string;
};

type Props = {
  item: RewardItem;
  delay: number;
  onFlip: () => void;
};

const Card = ({ item, onFlip, delay }: Props) => {
  const [rotateY, setRotateY] = useState(180);
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  const handleToggle = () => {
    if (item.type === RewardTypeEnum.NFT && !isLoadedImage) {
      return;
    }
    if (rotateY) {
      setRotateY(0);
      onFlip();
    }
  };

  const renderNft = () => {
    return (
      <>
        <MotionBox w="100%" h="100%" opacity={rotateY ? 0 : 1}>
          <NextImage
            src={item.value as string}
            layout="fill"
            onLoad={() => setIsLoadedImage(true)}
          />
        </MotionBox>
        <Box display={rotateY ? 'block' : 'none'}>
          <NextImage
            src={_.get(MAP_RARITY, `${_.get(item, 'rarity')}`, '')}
            style={{ transform: 'rotateY(-180deg)' }}
            layout="fill"
          />
        </Box>
      </>
    );
  };

  const renderUsdc = () => {
    if (rotateY) {
      return (
        <MotionBox w="100%" h="100%" sx={{ transform: 'rotateY(180deg)' }}>
          <NextImage src={USDC_BACK} layout="fill" />
        </MotionBox>
      );
    }
    return (
      <MotionBox w="100%" h="100%" position="relative">
        <Image layout="fill" src={USDC_FRONT} />
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
          border="4px solid"
          borderColor="secondary.300"
          transform="translateX(-50%)"
          color="black"
        >
          {item.value}
        </Text>
      </MotionBox>
    );
  };

  const renderXp = () => {
    if (rotateY) {
      return (
        <MotionBox w="100%" h="100%" sx={{ transform: 'rotateY(180deg)' }}>
          <NextImage src={XP_BACK} layout="fill" />
        </MotionBox>
      );
    }
    return (
      <MotionBox w="100%" h="100%" position="relative">
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
          color="black"
        >
          {item.value}
        </Text>
      </MotionBox>
    );
  };

  const renderItem = () => {
    switch (item.type) {
      case RewardTypeEnum.NFT:
        return renderNft();
      case RewardTypeEnum.USDC:
        return renderUsdc();
      case RewardTypeEnum.XP:
        return renderXp();
      default:
        return null;
    }
  };

  return (
    <>
      {item.type === RewardTypeEnum.NFT && (
        <Head>
          <link rel="preload" href={item.value as string} as="image" />
        </Head>
      )}
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
          borderRadius="3xl"
          position="relative"
          overflow="hidden"
          cursor="pointer"
          transition="transform 0.2s"
          _hover={{ transform: 'scale(1.02)' }}
        >
          {renderItem()}
        </Box>
      </MotionBox>
    </>
  );
};

export default Card;
