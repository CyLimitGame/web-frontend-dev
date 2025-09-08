import React from 'react';
import { Box, Flex, BoxProps } from '@chakra-ui/react';

import {
  BlueAwardIconRedStarIcon,
  BlueAwardIconYellowStarIcon,
  CongratulationsFlagIcon,
  GreenAwardIconYellowStarIcon,
} from '@/icons';
import { Text } from '@/components/Common';
import DisableAwardIcon from '@/icons/DisableAwardIcon';

const ICONS = {
  ['blue-yellow-star']: BlueAwardIconYellowStarIcon,
  ['blue-red-star']: BlueAwardIconRedStarIcon,
  ['green-yellow-star']: GreenAwardIconYellowStarIcon,
  ['disable-star']: DisableAwardIcon,
};

const GRADIENTS = {
  ['primary']: 'linear(to-b, primary.400, primary.700)',
  ['dark']: 'linear(to-b, gray.600, gray.900)',
  ['warning']: 'linear(to-b, secondary.400, error.300)',
  ['danger']: 'linear(to-b, error.400, error.800)',
  ['disable']: 'linear(to-b, gray.100, gray.100)',
};

export type MedalItemProps = {
  id?: string;
  bgAwards: 'primary' | 'dark' | 'warning' | 'danger' | 'disable';
  variant:
    | 'blue-yellow-star'
    | 'blue-red-star'
    | 'green-yellow-star'
    | 'disable-star';
  size?: 'small' | 'normal';
  isHoverScale?: boolean;
};

export type AwarsItemProps = BoxProps &
  MedalItemProps & {
    title: string;
    description: string;
    isWinner?: boolean;
  };

export const MedalItem = ({
  variant,
  bgAwards,
  size = 'normal',
  isHoverScale = true,
}: MedalItemProps) => {
  const Icon = ICONS[variant];

  const boxSize = size === 'small' ? '64px' : '142px';

  const iconProps = {
    width: size === 'small' ? '28px' : '64px',
    height: size === 'small' ? '38px' : '86px',
  };

  const hoverProps = isHoverScale
    ? { shadow: 'xl', transform: 'scale(1.06)' }
    : {};

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width={boxSize}
      height={boxSize}
      borderRadius="xl"
      bgGradient={GRADIENTS[bgAwards]}
      cursor="pointer"
      transition="all .2s"
      _hover={{ ...hoverProps }}
    >
      <Icon {...iconProps} />
    </Flex>
  );
};

const AwardsItem = ({
  variant,
  title,
  description,
  bgAwards,
  isWinner,
  ...props
}: AwarsItemProps) => {
  return (
    <Box
      position="relative"
      bg="gray.100"
      borderRadius="xl"
      transition="all .2s"
      cursor="pointer"
      _hover={{ shadow: 'xl', transform: 'scale(1.006)' }}
      {...props}
    >
      <Flex>
        <MedalItem isHoverScale={false} variant={variant} bgAwards={bgAwards} />
        <Flex flexDirection="column" justifyContent="center" ml={4}>
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          <Text color="gray.400">{description}</Text>
        </Flex>
      </Flex>
      {isWinner && (
        <CongratulationsFlagIcon
          width="100px"
          height="96px"
          position="absolute"
          right="0"
          top="0"
        />
      )}
    </Box>
  );
};

export default AwardsItem;
