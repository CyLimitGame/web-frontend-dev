import { BoxProps, Box, Flex, Icon } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import BottleIcon from '@/icons/BottleIcon';

type Props = BoxProps & {
  value: number;
  level?: number;
  total?: number;
};

const LevelProgressBarWithBottle = ({
  value,
  total = 0,
  level = 0,
  ...rest
}: Props) => {
  const { t } = useTranslation();
  const percent = (value / total) * 100;
  return (
    <Box
      position="relative"
      boxSizing="border-box"
      border="1px solid white"
      backgroundColor="whiteAlpha.240"
      borderRadius="50px"
      textAlign="right"
      textTransform="uppercase"
      px={['20px', '30px', '40px']}
      {...rest}
    >
      <Flex
        position="absolute"
        left="0"
        top="0"
        backgroundColor="white"
        height="100%"
        width={`${percent}%`}
        alignItems="center"
        justifyContent="flex-end"
        fontWeight="bold"
        fontSize={['14px', '16px', '18px']}
        borderLeftRadius="50px"
        fontStyle="normal"
        color="primary.500"
        minW="14px"
      >
        {value}
        <Icon as={BottleIcon} w="44px" h="44px" mr="-14px" />
      </Flex>
      {t('level')} {level}
    </Box>
  );
};

export default LevelProgressBarWithBottle;
