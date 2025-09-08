import { API_PATH } from './api-path';

import {
  UnderstandingRuleCategory,
  UnderstandingRule,
  ProgressionRule,
  ProgressionRuleFilter,
} from '@/typings/awards';
import request from '@/utils/request';

export const getUnderstandingRuleCategories = (
  params?: Record<string, unknown>
): Promise<UnderstandingRuleCategory[]> => {
  return request.get(API_PATH.GET_AWARDS_UNDERSTANDING_RULE_CATEGORIES, {
    params,
  });
};

export const getUnderstandingRules = (): Promise<UnderstandingRule[]> => {
  return request.get(API_PATH.GET_AWARDS_UNDERSTANDING_RULES);
};

export const postUnderstandingRule = (id: string) => {
  return request.post(`${API_PATH.GET_AWARDS_UNDERSTANDING_RULES}/${id}/claim`);
};

export const getProgressionRules = (
  params?: ProgressionRuleFilter
): Promise<ProgressionRule[]> => {
  return request.get(API_PATH.GET_AWARDS_PROGRESSION_RULES, { params });
};
