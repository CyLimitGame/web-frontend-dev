import { useMutation, useQuery, useQueryClient } from 'react-query';

import { API_PATH } from '@/apis/api-path';
import {
  getUnderstandingRuleCategories,
  getUnderstandingRules,
  getProgressionRules,
  postUnderstandingRule,
} from '@/apis/awards';
import { ProgressionRuleFilter } from '@/typings/awards';

export const useGetUnderstandingRuleCategories = () => {
  return useQuery(API_PATH.GET_AWARDS_UNDERSTANDING_RULE_CATEGORIES, () =>
    getUnderstandingRuleCategories()
  );
};

export const useGetUnderstandingRules = () => {
  return useQuery(API_PATH.GET_AWARDS_UNDERSTANDING_RULES, () =>
    getUnderstandingRules()
  );
};

export const usePostUnderstandingRule = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(postUnderstandingRule, {
    onSuccess: () => {
      queryClient
        .invalidateQueries([API_PATH.GET_AWARDS_UNDERSTANDING_RULES])
        .then();
    },
  });
};

export const useGetProgressionRules = (params?: ProgressionRuleFilter) => {
  return useQuery(API_PATH.GET_AWARDS_PROGRESSION_RULES, () =>
    getProgressionRules(params)
  );
};
