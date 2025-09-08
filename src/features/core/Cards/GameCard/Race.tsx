import React from 'react';
import { Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';

import colors from '@/theme/foundations/colors';
import { Race as RaceProps } from '@/typings/game';
import { MultiRaceTypeEnum } from '@/typings/game.enum';
import { capitalizeAndStartCase } from '@/utils/string';

type Props = {
  data: RaceProps;
  isMultiRaces: boolean;
  raceType: MultiRaceTypeEnum;
};

const MAP_STAGE_TYPE = {
  1: 'Stage',
  2: 'Prologue',
  3: 'Time Trial',
  4: 'General classification',
  5: 'Points classification',
  6: 'Youth classification',
  7: 'Mountains classification',
  8: 'One day race',
  9: 'Criterium',
  10: 'Teams classification',
};

const Race = ({ data, isMultiRaces, raceType }: Props) => {
  const { t } = useTranslation();

  const getText = () => {
    if (isMultiRaces) {
      return capitalizeAndStartCase(raceType);
    }
    return _.get(MAP_STAGE_TYPE, _.get(data, 'stage_type'), '');
  };

  return (
    <Box
      bg={`${colors.gray[500]}98`}
      backdropFilter="blur(2px)"
      fontWeight="medium"
      fontSize="sm"
      color="white"
      borderRadius="3xl"
      position="absolute"
      top={2}
      right={2}
      px={4}
      py={1}
    >
      {t(getText())}
    </Box>
  );
};

export default Race;
