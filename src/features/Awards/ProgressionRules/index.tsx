import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import _ from 'lodash';
import { useRouter } from 'next/router';

import { TabName } from '../AwardsTabs';

import RulesSubCategoryItem from './RulesSubCategoryItem';

import { useGetProgressionRules } from '@/queries/useAwards';
import { AwardProgressionCategoriesEnum } from '@/typings/awards.enum';
import { NoResultFound } from '@/components/Common';

const ProgressionRules = () => {
  const tab = _.get(useRouter().query, 'tab');
  const { data: getProgressionRules } = useGetProgressionRules();

  const progressionRulesByCategories = _.filter(
    getProgressionRules,
    (progressionRule) => {
      if (tab === TabName.FRIENDS_PROGRESSION) {
        return (
          progressionRule?.category === AwardProgressionCategoriesEnum.FRIENDS
        );
      }
      if (tab === TabName.FANTASY_GAME_PROGRESSION) {
        return (
          progressionRule?.category ===
          AwardProgressionCategoriesEnum.FANTASY_GAMES
        );
      }
      if (tab === TabName.COLLECTIBLE_PROGRESSION) {
        return (
          progressionRule?.category ===
          AwardProgressionCategoriesEnum.COLLECTIBLES
        );
      }
    }
  );

  const progressionRulesBySubcategories = _.groupBy(
    progressionRulesByCategories,
    'subcategory'
  );

  return (
    <Box>
      {_.isEmpty(progressionRulesBySubcategories) && (
        <Stack justifyContent="center">
          <NoResultFound type="common" />
        </Stack>
      )}
      {_.map(Object.keys(progressionRulesBySubcategories), (subcategory) => (
        <RulesSubCategoryItem
          data={progressionRulesBySubcategories[subcategory]}
          key={subcategory}
        />
      ))}
    </Box>
  );
};

export default ProgressionRules;
