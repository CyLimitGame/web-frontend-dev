import {
  Box,
  Center,
  Icon,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import HexagonIcon from '@/icons/HexagonIcon';
import { fixedNumber } from '@/utils/common';

type Props = {
  totalCapScore: number;
  totalScoreRequire: number;
  gameMode: string;
};

const ScoreProgressBar = ({
  totalCapScore,
  totalScoreRequire,
  gameMode,
}: Props) => {
  const { t } = useTranslation();
  const isFilled = totalScoreRequire <= totalCapScore;

  if (gameMode === 'global') {
    return null;
  }

  const percent = (totalCapScore / totalScoreRequire) * 100;

  return (
    <Slider
      aria-label="slider-ex-4"
      value={totalCapScore}
      max={totalScoreRequire}
      isReadOnly
      border="1px solid white"
      borderRadius="xl"
    >
      <SliderTrack bg="input" h="20px" borderRadius="xl" pos="relative">
        <SliderFilledTrack
          bg={totalCapScore > totalScoreRequire ? 'error.600' : 'error.400'}
        />
        <Center pos="absolute" h="100%" right={percent > 70 ? '46%' : '30px'}>
          {t('max_value', { value: fixedNumber(totalScoreRequire, 0) })}
        </Center>
      </SliderTrack>
      <SliderThumb boxSize={6} h="20px" w="20px">
        <Box pos="relative">
          <Icon as={HexagonIcon} fontSize="4xl" color="white" />
          <Center
            pos="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            color="primary.500"
            fontWeight="bold"
          >
            {fixedNumber(totalCapScore, 0)}
            <Box pos="relative" display={!isFilled ? 'block' : 'none'}>
              <Box
                pos="absolute"
                left={percent < 70 ? '20px' : '-60px'}
                top="-12px"
                color="white"
                fontWeight="medium"
              >
                {fixedNumber(totalScoreRequire - totalCapScore, 0)}
              </Box>
            </Box>
          </Center>
        </Box>
      </SliderThumb>
    </Slider>
  );
};

export default ScoreProgressBar;
