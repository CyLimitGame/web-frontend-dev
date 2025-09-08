import React from 'react';
import { Stack } from '@chakra-ui/react';
import _ from 'lodash';

import RulesCategoryItem from './RulesCategoryItem';

import {
  useGetUnderstandingRuleCategories,
  useGetUnderstandingRules,
} from '@/queries/useAwards';
import { NoResultFound } from '@/components/Common';

const UnderstandingRules = () => {
  const { data: understandingRuleCategories } =
    useGetUnderstandingRuleCategories();
  const { data: understandingRules } = useGetUnderstandingRules();

  const understandingRulesByCategories = _.map(
    understandingRuleCategories,
    (category) => {
      const understandingRulesByCategories = _.filter(
        understandingRules,
        (quest) => {
          return quest.category === category.category;
        }
      );

      return {
        ...category,
        understandingRules: _.sortBy(
          understandingRulesByCategories,
          (quest) => {
            return quest.index;
          }
        ),
      };
    }
  );

  const understandingRulesByCategoriesSorted = _.sortBy(
    understandingRulesByCategories,
    (category) => {
      return category.index;
    }
  );

  return (
    <Stack>
      {_.isEmpty(understandingRulesByCategoriesSorted) && (
        <Stack justifyContent="center">
          <NoResultFound type="common" />
        </Stack>
      )}
      {_.map(understandingRulesByCategoriesSorted, (category) => (
        <RulesCategoryItem category={category || []} key={category.category} />
      ))}
    </Stack>
  );
};

export default UnderstandingRules;
